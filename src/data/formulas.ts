import type { Formula } from '@/types/game';

// 经典方剂数据库
export const FORMULAS_DATA: Formula[] = [
  {
    id: 'sijunzi',
    name: '四君子汤',
    herbs: ['renshen', 'baizhu', 'fuling', 'gancao'],
    effects: '益气健脾',
    description: '补气第一方，主治脾胃气虚证。方中人参大补元气，白术健脾燥湿，茯苓渗湿健脾，甘草调和诸药。',
    score: 1000,
    category: '补益剂'
  },
  {
    id: 'siwu',
    name: '四物汤',
    herbs: ['danggui', 'chuanxiong', 'baishao', 'shudi'],
    effects: '补血调血',
    description: '补血第一方，主治营血虚滞证。当归补血活血，川芎活血行气，白芍养血敛阴，熟地滋阴补血。',
    score: 1000,
    category: '补益剂'
  },
  {
    id: 'liujunzi',
    name: '六君子汤',
    herbs: ['renshen', 'baizhu', 'fuling', 'gancao', 'chenpi', 'banxia'],
    effects: '益气健脾，燥湿化痰',
    description: '四君子汤加陈皮、半夏，主治脾胃气虚兼痰湿证。',
    score: 1500,
    category: '补益剂'
  },
  {
    id: 'bazhen',
    name: '八珍汤',
    herbs: ['renshen', 'baizhu', 'fuling', 'gancao', 'danggui', 'chuanxiong', 'baishao', 'shudi'],
    effects: '气血双补',
    description: '四君子汤合四物汤，主治气血两虚证。',
    score: 2000,
    category: '补益剂'
  },
  {
    id: 'buzhongyiqi',
    name: '补中益气汤',
    herbs: ['huangqi', 'renshen', 'baizhu', 'gancao', 'danggui', 'chenpi', 'shengma', 'chaihu'],
    effects: '补中益气，升阳举陷',
    description: '主治脾胃气虚，中气下陷证。李东垣创制，为补土派代表方。',
    score: 2500,
    category: '补益剂'
  },
  {
    id: 'yupingfeng',
    name: '玉屏风散',
    herbs: ['huangqi', 'baizhu', 'fangfeng'],
    effects: '益气固表止汗',
    description: '主治表虚自汗证。黄芪益气固表，白术健脾益气，防风祛风御邪。',
    score: 800,
    category: '补益剂'
  },
  {
    id: 'liuwei',
    name: '六味地黄丸',
    herbs: ['shudi', 'shanyao', 'shanzhuyu', 'fuling', 'zexie', 'mudanpi'],
    effects: '滋阴补肾',
    description: '补肾阴第一方，主治肾阴虚证。三补三泻，补而不滞。',
    score: 1800,
    category: '补益剂'
  },
  {
    id: 'xiaoyao',
    name: '逍遥散',
    herbs: ['chaihu', 'danggui', 'baishao', 'baizhu', 'fuling', 'gancao', 'shengjiang', 'bohe'],
    effects: '疏肝解郁，养血健脾',
    description: '主治肝郁血虚脾弱证。疏肝养血健脾，使肝气条达，血脉和畅。',
    score: 2200,
    category: '和解剂'
  },
  {
    id: 'guizhi',
    name: '桂枝汤',
    herbs: ['guizhi', 'baishao', 'shengjiang', 'dazao', 'gancao'],
    effects: '解肌发表，调和营卫',
    description: '《伤寒论》第一方，主治外感风寒表虚证。桂枝解肌发表，芍药敛阴和营。',
    score: 1200,
    category: '解表剂'
  },
  {
    id: 'mahuang',
    name: '麻黄汤',
    herbs: ['mahuang', 'guizhi', 'xingren', 'gancao'],
    effects: '发汗解表，宣肺平喘',
    description: '主治外感风寒表实证。麻黄发汗解表，桂枝助麻黄解表，杏仁宣肺平喘。',
    score: 1000,
    category: '解表剂'
  },
  {
    id: 'yinqiao',
    name: '银翘散',
    herbs: ['jinyinhua', 'lianqiao', 'bohe', 'niubangzi', 'jiegeng', 'zhuru', 'gancao', 'danzhuye'],
    effects: '辛凉透表，清热解毒',
    description: '主治温病初起。金银花、连翘清热解毒，薄荷、牛蒡子疏散风热。',
    score: 2000,
    category: '解表剂'
  },
  {
    id: 'sangju',
    name: '桑菊饮',
    herbs: ['sangye', 'juhua', 'xingren', 'lianqiao', 'bohe', 'jiegeng', 'gancao', 'lugen'],
    effects: '疏风清热，宣肺止咳',
    description: '主治风温初起。桑叶、菊花疏风清热，杏仁、桔梗宣肺止咳。',
    score: 1800,
    category: '解表剂'
  },
  {
    id: 'xiaochaihu',
    name: '小柴胡汤',
    herbs: ['chaihu', 'huangqin', 'renshen', 'banxia', 'gancao', 'shengjiang', 'dazao'],
    effects: '和解少阳',
    description: '主治少阳病证。柴胡疏解少阳，黄芩清热，人参、甘草扶正。',
    score: 1800,
    category: '和解剂'
  },
  {
    id: 'huoxiang',
    name: '藿香正气散',
    herbs: ['huoxiang', 'zisu', 'baizhi', 'dafu', 'chenpi', 'banxia', 'houpo', 'fuling', 'jiegeng', 'baizhu', 'gancao', 'dazao', 'shengjiang'],
    effects: '解表化湿，理气和中',
    description: '主治外感风寒，内伤湿滞证。藿香芳香化浊，紫苏解表散寒。',
    score: 2500,
    category: '祛湿剂'
  },
  {
    id: 'pingwei',
    name: '平胃散',
    herbs: ['cangzhu', 'houpo', 'chenpi', 'gancao', 'shengjiang', 'dazao'],
    effects: '燥湿运脾，行气和胃',
    description: '主治湿滞脾胃证。苍术燥湿健脾，厚朴行气除满，陈皮理气和中。',
    score: 1500,
    category: '祛湿剂'
  },
  {
    id: 'wuling',
    name: '五苓散',
    herbs: ['zhuling', 'zexie', 'baizhu', 'fuling', 'guizhi'],
    effects: '利水渗湿，温阳化气',
    description: '主治膀胱气化不利，水湿内聚证。泽泻、茯苓利水渗湿，桂枝温阳化气。',
    score: 1500,
    category: '祛湿剂'
  },
  {
    id: 'longdan',
    name: '龙胆泻肝汤',
    herbs: ['longdancao', 'huangqin', 'zhizi', 'zexie', 'mutong', 'cheqianzi', 'danggui', 'shengdi', 'chaihu', 'gancao'],
    effects: '清泻肝胆实火，清利肝经湿热',
    description: '主治肝胆实火上炎证及肝经湿热下注证。龙胆草大泻肝胆实火。',
    score: 2500,
    category: '清热剂'
  },
  {
    id: 'huanglian',
    name: '黄连解毒汤',
    herbs: ['huanglian', 'huangqin', 'huangbai', 'zhizi'],
    effects: '泻火解毒',
    description: '主治三焦火毒炽盛证。黄连泻心火，黄芩泻肺火，黄柏泻肾火，栀子泻三焦火。',
    score: 1000,
    category: '清热剂'
  },
  {
    id: 'baihu',
    name: '白虎汤',
    herbs: ['shigao', 'zhimu', 'gancao', 'jingmi'],
    effects: '清热生津',
    description: '主治气分热盛证。石膏大寒清热泻火，知母滋阴清热，甘草、粳米益胃生津。',
    score: 1000,
    category: '清热剂'
  },
  {
    id: 'qingying',
    name: '清营汤',
    herbs: ['xijiao', 'shengdi', 'xuanshen', 'zhuru', 'maidong', 'danshen', 'huanglian', 'jinyinhua', 'lianqiao'],
    effects: '清营解毒，透热养阴',
    description: '主治热入营分证。犀角清心凉血解毒，生地凉血滋阴，金银花、连翘清热解毒。',
    score: 2800,
    category: '清热剂'
  }
];

// 根据ID获取方剂
export const getFormulaById = (id: string): Formula | undefined => {
  return FORMULAS_DATA.find(formula => formula.id === id);
};

// 根据药材组合查找方剂
export const findFormulaByHerbs = (herbIds: string[]): Formula | undefined => {
  return FORMULAS_DATA.find(formula => {
    if (formula.herbs.length !== herbIds.length) return false;
    const sortedFormula = [...formula.herbs].sort();
    const sortedInput = [...herbIds].sort();
    return sortedFormula.every((herb, index) => herb === sortedInput[index]);
  });
};

// 检查药材组合是否可以合成方剂
export const canSynthesizeFormula = (herbIds: string[]): boolean => {
  return findFormulaByHerbs(herbIds) !== undefined;
};

// 获取包含特定药材的方剂
export const getFormulasWithHerb = (herbId: string): Formula[] => {
  return FORMULAS_DATA.filter(formula => formula.herbs.includes(herbId));
};
