import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FORMULAS_DATA } from '@/data/formulas';
import { HERBS_DATA } from '@/data/herbs';
import { useGame } from '@/contexts/GameContext';
import { Search, FlaskConical, CheckCircle2 } from 'lucide-react';

export default function FormulasPage() {
  const { gameState } = useGame();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = FORMULAS_DATA.filter(formula =>
    formula.name.includes(searchTerm) || formula.category.includes(searchTerm)
  );

  return (
    <div className="@container p-4 @md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl @md:text-4xl font-bold gradient-text mb-2">方剂大全</h1>
          <p className="text-muted-foreground">
            已完成 {gameState.completedFormulas.length} / {FORMULAS_DATA.length} 个方剂
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索方剂名称或类别..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
          {filteredFormulas.map(formula => {
            const isCompleted = gameState.completedFormulas.includes(formula.id);
            
            return (
              <Dialog key={formula.id}>
                <DialogTrigger asChild>
                  <Card className={`cursor-pointer transition-all hover:shadow-elegant ${
                    !isCompleted ? 'opacity-50' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {isCompleted ? formula.name : '???'}
                            {isCompleted && <CheckCircle2 className="w-5 h-5 text-primary" />}
                          </CardTitle>
                          <CardDescription>{isCompleted ? formula.category : '未解锁'}</CardDescription>
                        </div>
                        <FlaskConical className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isCompleted ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-3">{formula.effects}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{formula.herbs.length}味药</Badge>
                            <Badge className="bg-gradient-secondary">{formula.score}分</Badge>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">完成合成后解锁详情</p>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                {isCompleted && (
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{formula.name}</DialogTitle>
                      <DialogDescription>{formula.category}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">功效</h4>
                        <p className="text-muted-foreground">{formula.effects}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">方剂组成</h4>
                        <div className="grid grid-cols-2 @md:grid-cols-3 gap-2">
                          {formula.herbs.map(herbId => {
                            const herb = HERBS_DATA.find(h => h.id === herbId);
                            return herb ? (
                              <Badge key={herbId} variant="outline" className="justify-center py-2">
                                {herb.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">方解</h4>
                        <p className="text-sm text-muted-foreground">{formula.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-muted-foreground">合成奖励</span>
                        <Badge className="bg-gradient-secondary text-lg px-4 py-1">{formula.score}分</Badge>
                      </div>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
}
