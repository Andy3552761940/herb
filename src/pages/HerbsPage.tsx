import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HERBS_DATA } from '@/data/herbs';
import { useGame } from '@/contexts/GameContext';
import { Search, Leaf } from 'lucide-react';
import type { RegionType, Rarity } from '@/types/game';

export default function HerbsPage() {
  const { gameState } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');

  const filteredHerbs = HERBS_DATA.filter(herb => {
    const matchesSearch = herb.name.includes(searchTerm) || herb.pinyin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || herb.region === filterRegion;
    const matchesRarity = filterRarity === 'all' || herb.rarity === filterRarity;
    return matchesSearch && matchesRegion && matchesRarity;
  });

  const getRarityColor = (rarity: Rarity) => {
    const colors = {
      common: 'bg-muted',
      uncommon: 'bg-green-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-amber-500'
    };
    return colors[rarity];
  };

  const getRarityText = (rarity: Rarity) => {
    const texts = {
      common: '普通',
      uncommon: '优质',
      rare: '稀有',
      epic: '史诗',
      legendary: '传说'
    };
    return texts[rarity];
  };

  const getRegionText = (region: RegionType) => {
    const texts = {
      mountain: '山林',
      grassland: '草原',
      wetland: '湿地'
    };
    return texts[region];
  };

  return (
    <div className="@container p-4 @md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl @md:text-4xl font-bold gradient-text mb-2">本草图谱</h1>
          <p className="text-muted-foreground">
            已收集 {gameState.collectedHerbs.length} / {HERBS_DATA.length} 种药材
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col @md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索药材名称或拼音..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="w-full @md:w-[180px]">
                  <SelectValue placeholder="选择区域" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部区域</SelectItem>
                  <SelectItem value="mountain">山林</SelectItem>
                  <SelectItem value="grassland">草原</SelectItem>
                  <SelectItem value="wetland">湿地</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRarity} onValueChange={setFilterRarity}>
                <SelectTrigger className="w-full @md:w-[180px]">
                  <SelectValue placeholder="选择稀有度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部稀有度</SelectItem>
                  <SelectItem value="common">普通</SelectItem>
                  <SelectItem value="uncommon">优质</SelectItem>
                  <SelectItem value="rare">稀有</SelectItem>
                  <SelectItem value="epic">史诗</SelectItem>
                  <SelectItem value="legendary">传说</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
          {filteredHerbs.map(herb => {
            const isCollected = gameState.collectedHerbs.includes(herb.id);
            
            return (
              <Dialog key={herb.id}>
                <DialogTrigger asChild>
                  <Card className={`cursor-pointer transition-all hover:shadow-elegant ${
                    !isCollected ? 'opacity-50' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center text-5xl relative">
                        {isCollected ? '🌿' : '❓'}
                        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getRarityColor(herb.rarity)}`} />
                      </div>
                      <h3 className="font-semibold text-center mb-1">
                        {isCollected ? herb.name : '???'}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center">
                        {isCollected ? `${herb.nature} · ${herb.taste.join('、')}` : '未解锁'}
                      </p>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {getRegionText(herb.region)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getRarityText(herb.rarity)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                {isCollected && (
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{herb.name}</DialogTitle>
                      <DialogDescription>{herb.pinyin}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-8xl">
                        🌿
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">性味归经</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">性：</span>{herb.nature}</p>
                            <p><span className="text-muted-foreground">味：</span>{herb.taste.join('、')}</p>
                            <p><span className="text-muted-foreground">归经：</span>{herb.meridians.join('、')}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">药材信息</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">区域：</span>{getRegionText(herb.region)}</p>
                            <p><span className="text-muted-foreground">稀有度：</span>{getRarityText(herb.rarity)}</p>
                            <p><span className="text-muted-foreground">生长时间：</span>{herb.growthTime}秒</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">功效主治</h4>
                        <div className="flex flex-wrap gap-2">
                          {herb.effects.map((effect, index) => (
                            <Badge key={index} variant="secondary">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">用法用量</h4>
                        <p className="text-sm text-muted-foreground">{herb.usage}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">药材描述</h4>
                        <p className="text-sm text-muted-foreground">{herb.description}</p>
                      </div>

                      {herb.story && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            <Leaf className="w-4 h-4 inline mr-1" />
                            药材故事
                          </h4>
                          <p className="text-sm text-muted-foreground italic">{herb.story}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            );
          })}
        </div>

        {filteredHerbs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              没有找到符合条件的药材
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
