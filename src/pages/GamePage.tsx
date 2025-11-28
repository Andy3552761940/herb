import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { HERBS_DATA, getRandomHerbs } from '@/data/herbs';
import { FORMULAS_DATA, findFormulaByHerbs } from '@/data/formulas';
import { toast } from 'sonner';
import { Sparkles, Trophy, X } from 'lucide-react';

export default function GamePage() {
  const { gameState, updateScore, addHerbToInventory, completeFormula, getHerbQuantity } = useGame();
  const [selectedHerbs, setSelectedHerbs] = useState<string[]>([]);
  const [availableHerbs, setAvailableHerbs] = useState(getRandomHerbs(12));

  useEffect(() => {
    setAvailableHerbs(getRandomHerbs(12));
  }, []);

  const handleSelectHerb = (herbId: string) => {
    if (selectedHerbs.includes(herbId)) {
      setSelectedHerbs(selectedHerbs.filter(id => id !== herbId));
    } else if (selectedHerbs.length < 8) {
      setSelectedHerbs([...selectedHerbs, herbId]);
    } else {
      toast.error('最多只能选择8种药材');
    }
  };

  const handleSynthesize = () => {
    if (selectedHerbs.length < 3) {
      toast.error('至少需要选择3种药材才能合成');
      return;
    }

    const formula = findFormulaByHerbs(selectedHerbs);
    
    if (formula) {
      updateScore(formula.score);
      completeFormula(formula.id);
      toast.success(`成功合成【${formula.name}】！获得${formula.score}分`, {
        description: formula.effects
      });
      setSelectedHerbs([]);
      setAvailableHerbs(getRandomHerbs(12));
    } else {
      toast.error('这些药材无法合成方剂，请尝试其他组合');
    }
  };

  const handleCollect = (herbId: string) => {
    const herb = HERBS_DATA.find(h => h.id === herbId);
    if (herb) {
      const quality = Math.floor(Math.random() * 30) + 70;
      addHerbToInventory(herbId, 1, quality);
      updateScore(50);
      toast.success(`采集到【${herb.name}】！品质：${quality}%`);
    }
  };

  const handleClearSelection = () => {
    setSelectedHerbs([]);
  };

  return (
    <div className="@container p-4 @md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col @md:flex-row justify-between items-start @md:items-center gap-4">
          <div>
            <h1 className="text-3xl @md:text-4xl font-bold gradient-text mb-2">方剂合成</h1>
            <p className="text-muted-foreground">选择药材，合成经典方剂</p>
          </div>
          <Card className="w-full @md:w-auto">
            <CardContent className="pt-6">
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{gameState.level}</div>
                  <div className="text-sm text-muted-foreground">等级</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{gameState.score}</div>
                  <div className="text-sm text-muted-foreground">积分</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>已选药材 ({selectedHerbs.length}/8)</CardTitle>
                <CardDescription>选择3-8种药材进行合成</CardDescription>
              </div>
              {selectedHerbs.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearSelection}>
                  <X className="w-4 h-4 mr-2" />
                  清空
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[100px] flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
              {selectedHerbs.length === 0 ? (
                <div className="w-full text-center text-muted-foreground py-8">
                  请从下方选择药材
                </div>
              ) : (
                selectedHerbs.map(herbId => {
                  const herb = HERBS_DATA.find(h => h.id === herbId);
                  return herb ? (
                    <Badge
                      key={herbId}
                      variant="secondary"
                      className="text-base px-4 py-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleSelectHerb(herbId)}
                    >
                      {herb.name}
                    </Badge>
                  ) : null;
                })
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSynthesize}
                disabled={selectedHerbs.length < 3}
                className="flex-1"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                合成方剂
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>可用药材</CardTitle>
            <CardDescription>点击药材进行选择或采集</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4">
              {availableHerbs.map(herb => {
                const isSelected = selectedHerbs.includes(herb.id);
                const quantity = getHerbQuantity(herb.id);
                
                return (
                  <Card
                    key={herb.id}
                    className={`cursor-pointer transition-all hover:shadow-elegant ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center text-4xl">
                        🌿
                      </div>
                      <h3 className="font-semibold text-center mb-1">{herb.name}</h3>
                      <p className="text-xs text-muted-foreground text-center mb-2">
                        {herb.nature} · {herb.taste.join('、')}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={isSelected ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => handleSelectHerb(herb.id)}
                        >
                          {isSelected ? '已选' : '选择'}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleCollect(herb.id)}
                        >
                          采集
                        </Button>
                      </div>
                      {quantity > 0 && (
                        <div className="text-xs text-center mt-2 text-muted-foreground">
                          库存：{quantity}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Trophy className="w-5 h-5 inline mr-2" />
              已完成方剂
            </CardTitle>
          </CardHeader>
          <CardContent>
            {gameState.completedFormulas.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                还没有完成任何方剂，快去尝试合成吧！
              </div>
            ) : (
              <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
                {gameState.completedFormulas.map(formulaId => {
                  const formula = FORMULAS_DATA.find(f => f.id === formulaId);
                  return formula ? (
                    <Card key={formulaId}>
                      <CardHeader>
                        <CardTitle className="text-lg">{formula.name}</CardTitle>
                        <CardDescription>{formula.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{formula.effects}</p>
                        <Badge variant="secondary">{formula.score}分</Badge>
                      </CardContent>
                    </Card>
                  ) : null;
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
