// 游戏相关类型定义

// 药材性味类型
export type HerbNature = '温' | '热' | '寒' | '凉' | '平' | '微寒' | '微温' | '微凉' | '大寒';
export type HerbTaste = '辛' | '甘' | '酸' | '苦' | '咸' | '淡' | '微苦' | '微甘';

// 药材归经
export type Meridian = '肺' | '脾' | '胃' | '肝' | '肾' | '心' | '胆' | '膀胱' | '大肠' | '小肠' | '心包' | '三焦';

// 药材稀有度
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// 区域类型
export type RegionType = 'mountain' | 'grassland' | 'wetland';

// 天气类型
export type WeatherType = 'sunny' | 'rainy' | 'cloudy';

// 药材数据结构
export interface Herb {
  id: string;
  name: string;
  pinyin: string;
  nature: HerbNature;
  taste: HerbTaste[];
  meridians: Meridian[];
  effects: string[];
  usage: string;
  description: string;
  rarity: Rarity;
  region: RegionType;
  growthTime: number; // 生长时间（秒）
  image: string;
  story?: string;
}

// 方剂数据结构
export interface Formula {
  id: string;
  name: string;
  herbs: string[]; // 药材ID数组
  effects: string;
  description: string;
  score: number;
  category: string;
}

// 游戏状态
export interface GameState {
  score: number;
  level: number;
  collectedHerbs: string[];
  completedFormulas: string[];
  currentRegion: RegionType;
  weather: WeatherType;
  inventory: HerbInventory[];
}

// 库存药材
export interface HerbInventory {
  herbId: string;
  quantity: number;
  quality: number; // 品质 0-100
}

// NPC类型
export type NPCType = 'zhangzhongjing' | 'lishizhen' | 'yetianshi';

// NPC数据结构
export interface NPC {
  id: NPCType;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  description: string;
}

// 成就类型
export type AchievementType = 'collection' | 'formula' | 'learning' | 'exploration';

// 成就数据结构
export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: AchievementType;
  requirement: number;
  progress: number;
  completed: boolean;
  reward: string;
}

// 学习进度
export interface LearningProgress {
  herbId: string;
  learned: boolean;
  lastReviewed: number;
  reviewCount: number;
}

// 游戏配置
export interface GameConfig {
  gridSize: number;
  matchCount: number;
  timeLimit: number;
  scoreMultiplier: number;
}

// 消除游戏单元格
export interface GameCell {
  id: string;
  herbId: string;
  row: number;
  col: number;
  selected: boolean;
  matched: boolean;
}

// 游戏关卡
export interface GameLevel {
  level: number;
  targetScore: number;
  timeLimit: number;
  availableHerbs: string[];
  targetFormulas?: string[];
}
