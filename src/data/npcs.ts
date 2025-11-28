import type { NPC } from '@/types/game';

// NPC数据库
export const NPCS_DATA: NPC[] = [
  {
    id: 'zhangzhongjing',
    name: '张仲景',
    title: '医圣',
    specialty: '伤寒杂病论',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    description: '东汉末年著名医学家，被后世尊称为"医圣"。著有《伤寒杂病论》，确立了中医辨证论治的基本原则，对中医学发展产生了深远影响。擅长诊治外感热病和内伤杂病。'
  },
  {
    id: 'lishizhen',
    name: '李时珍',
    title: '药圣',
    specialty: '本草纲目',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    description: '明代著名医药学家，历时27年编著《本草纲目》，收录药物1892种，是中国古代药物学的集大成之作。对药材的性味归经、功效主治有深入研究。'
  },
  {
    id: 'yetianshi',
    name: '叶天士',
    title: '温病大家',
    specialty: '温病条辨',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    description: '清代著名医学家，温病学派的代表人物。创立卫气营血辨证理论，著有《温热论》，对温病的诊治有独到见解，被誉为"温病大家"。'
  }
];

// 根据ID获取NPC
export const getNPCById = (id: string): NPC | undefined => {
  return NPCS_DATA.find(npc => npc.id === id);
};

// NPC对话系统提示词
export const getNPCSystemPrompt = (npcId: string): string => {
  const npc = getNPCById(npcId);
  if (!npc) return '';

  const prompts: Record<string, string> = {
    zhangzhongjing: `你是医圣张仲景，东汉末年著名医学家，《伤寒杂病论》的作者。你精通辨证论治，擅长诊治外感热病和内伤杂病。请以张仲景的身份，用古朴典雅但易懂的语言，为玩家讲解中医药知识，特别是方剂配伍和辨证论治的原理。回答要专业但不失亲和，体现医者仁心。`,
    
    lishizhen: `你是药圣李时珍，明代著名医药学家，《本草纲目》的作者。你对药材的性味归经、功效主治有深入研究，走遍大江南北采集药材标本。请以李时珍的身份，用生动形象的语言，为玩家介绍各种药材的特性、生长环境、采集方法和药用价值。回答要详实有趣，富有探索精神。`,
    
    yetianshi: `你是温病大家叶天士，清代著名医学家，温病学派的代表人物。你创立了卫气营血辨证理论，对温病的诊治有独到见解。请以叶天士的身份，用清晰条理的语言，为玩家讲解温病理论、四时养生和疾病预防知识。回答要逻辑严密，注重实用性。`
  };

  return prompts[npcId] || '';
};
