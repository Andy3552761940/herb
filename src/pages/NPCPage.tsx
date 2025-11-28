import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { NPCS_DATA, getNPCSystemPrompt } from '@/data/npcs';
import { chatWithNPC } from '@/services/ai';
import { toast } from 'sonner';
import { Send, Loader2, User } from 'lucide-react';
import { Streamdown } from 'streamdown';

export default function NPCPage() {
  const [selectedNPC, setSelectedNPC] = useState(NPCS_DATA[0].id);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentNPC = NPCS_DATA.find(npc => npc.id === selectedNPC);

  const handleAsk = async () => {
    if (!question.trim()) {
      toast.error('请输入您的问题');
      return;
    }

    if (!currentNPC) return;

    setIsLoading(true);
    setAnswer('');

    const systemPrompt = getNPCSystemPrompt(currentNPC.id);

    await chatWithNPC(
      currentNPC.id,
      systemPrompt,
      question,
      (content) => {
        setAnswer(content);
      },
      () => {
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        toast.error('对话失败，请稍后重试');
        console.error(error);
      }
    );
  };

  return (
    <div className="@container p-4 @md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl @md:text-4xl font-bold gradient-text mb-2">拜访名医</h1>
          <p className="text-muted-foreground">向医圣请教，获得智慧指引</p>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
          {NPCS_DATA.map(npc => (
            <Card
              key={npc.id}
              className={`cursor-pointer transition-all hover:shadow-elegant ${
                selectedNPC === npc.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedNPC(npc.id)}
            >
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-center">{npc.name}</CardTitle>
                <CardDescription className="text-center">
                  <Badge variant="secondary">{npc.title}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-2">
                  {npc.description}
                </p>
                <p className="text-xs text-center text-primary">
                  擅长：{npc.specialty}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentNPC && (
          <Card>
            <CardHeader>
              <CardTitle>向{currentNPC.name}请教</CardTitle>
              <CardDescription>
                {currentNPC.name}将为您解答中医药相关问题
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">您的问题</label>
                <Textarea
                  placeholder={`例如：请问${currentNPC.name}，四君子汤的配伍原理是什么？`}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleAsk}
                disabled={isLoading || !question.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {currentNPC.name}正在思考...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    向{currentNPC.name}请教
                  </>
                )}
              </Button>

              {answer && (
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {currentNPC.name}的回答
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <Streamdown>{answer}</Streamdown>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>常见问题示例</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                '四君子汤的配伍原理是什么？',
                '人参和党参有什么区别？',
                '如何根据体质选择合适的药材？',
                '温病和伤寒有什么不同？',
                '如何辨别药材的真伪优劣？'
              ].map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setQuestion(q)}
                  disabled={isLoading}
                >
                  {q}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
