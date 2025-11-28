import ky, { type KyResponse, type AfterResponseHook, type NormalizedOptions } from 'ky';
import { createParser, type EventSourceParser } from 'eventsource-parser';

const APP_ID = import.meta.env.VITE_APP_ID;

export interface SSEOptions {
  onData: (data: string) => void;
  onEvent?: (event: any) => void;
  onCompleted?: (error?: Error) => void;
  onAborted?: () => void;
  onReconnectInterval?: (interval: number) => void;
}

export const createSSEHook = (options: SSEOptions): AfterResponseHook => {
  const hook: AfterResponseHook = async (request: Request, _options: NormalizedOptions, response: KyResponse) => {
    if (!response.ok || !response.body) {
      return;
    }

    let completed = false;
    const innerOnCompleted = (error?: Error): void => {
      if (completed) {
        return;
      }

      completed = true;
      options.onCompleted?.(error);
    };

    const isAborted = false;

    const reader: ReadableStreamDefaultReader<Uint8Array> = response.body.getReader();

    const decoder = new TextDecoder('utf8');

    const parser: EventSourceParser = createParser({
      onEvent: (event) => {
        if (event.data) {
          options.onEvent?.(event);
          const dataArray: string[] = event.data.split('\\ ');
          for (const data of dataArray) {
            options.onData(data);
          }
        }
      }
    });

    const read = (): void => {
      if (isAborted) {
        return;
      }

      reader.read().then((result: ReadableStreamReadResult<Uint8Array>) => {
        if (result.done) {
          innerOnCompleted();
          return;
        }

        parser.feed(decoder.decode(result.value, { stream: true }));

        read();
      }).catch(error => {
        if (request.signal.aborted) {
          options.onAborted?.();
          return;
        }

        innerOnCompleted(error as Error);
      });
    };

    read();

    return response;
  };

  return hook;
};

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id?: string;
}

export interface ChatStreamOptions {
  endpoint: string;
  messages: ChatMessage[];
  apiId: string;
  onUpdate: (content: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  signal?: AbortSignal;
}

export const sendChatStream = async (options: ChatStreamOptions): Promise<void> => {
  const { messages, onUpdate, onComplete, onError, signal } = options;

  let currentContent = '';

  const sseHook = createSSEHook({
    onData: (data: string) => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.choices?.[0]?.delta?.content) {
          currentContent += parsed.choices[0].delta.content;
          onUpdate(currentContent);
        }
      } catch {
        console.warn('Failed to parse SSE data:', data);
      }
    },
    onCompleted: (error?: Error) => {
      if (error) {
        onError(error);
      } else {
        onComplete();
      }
    },
    onAborted: () => {
      console.log('Stream aborted');
    }
  });

  try {
    await ky.post(options.endpoint, {
      json: {
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        enable_thinking: false
      },
      headers: {
        'X-App-Id': options.apiId,
        'Content-Type': 'application/json'
      },
      signal,
      hooks: {
        afterResponse: [sseHook]
      }
    });
  } catch (error) {
    if (!signal?.aborted) {
      onError(error as Error);
    }
  }
};

// NPC对话服务
export const chatWithNPC = async (
  npcId: string,
  systemPrompt: string,
  userMessage: string,
  onUpdate: (content: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void,
  signal?: AbortSignal
): Promise<void> => {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: userMessage
    }
  ];

  await sendChatStream({
    endpoint: 'https://api-integrations.appmiaoda.com/app-7ryx2zbi2k1t/api-2bk93oeO9NlE/v2/chat/completions',
    apiId: APP_ID,
    messages,
    onUpdate,
    onComplete,
    onError,
    signal
  });
};

// 个性化学习推荐服务
export const getPersonalizedRecommendation = async (
  collectedHerbs: string[],
  completedFormulas: string[],
  onUpdate: (content: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void,
  signal?: AbortSignal
): Promise<void> => {
  const systemPrompt = `你是一位中医药学习助手，根据玩家已收集的药材和完成的方剂，为其推荐下一步学习内容。推荐要循序渐进，由浅入深，注重知识的关联性和实用性。`;

  const userMessage = `我已经收集了${collectedHerbs.length}种药材，完成了${completedFormulas.length}个方剂的合成。请为我推荐接下来应该学习的药材和方剂，并简要说明推荐理由。`;

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: userMessage
    }
  ];

  await sendChatStream({
    endpoint: 'https://api-integrations.appmiaoda.com/app-7ryx2zbi2k1t/api-2bk93oeO9NlE/v2/chat/completions',
    apiId: APP_ID,
    messages,
    onUpdate,
    onComplete,
    onError,
    signal
  });
};
