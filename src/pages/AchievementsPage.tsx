import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Star, BookOpen, FlaskConical, Map } from 'lucide-react';

export default function AchievementsPage() {
  const { gameState } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const achievements = [
    {
      id: 'collector_beginner',
      name: '初识百草',
      description: '收集10种药材',
      icon: BookOpen,
      requirement: 10,
      progress: gameState.collectedHerbs.length,
      reward: '500积分',
      category: '收集'
    },
    {
      id: 'collector_intermediate',
      name: '本草通',
      description: '收集25种药材',
      icon: BookOpen,
      requirement: 25,
      progress: gameState.collectedHerbs.length,
      reward: '1500积分',
      category: '收集'
    },
    {
      id: 'collector_master',
      name: '药圣传人',
      description: '收集全部50种药材',
      icon: Star,
      requirement: 50,
      progress: gameState.collectedHerbs.length,
      reward: '5000积分',
      category: '收集'
    },
    {
      id: 'formula_beginner',
      name: '方剂入门',
      description: '完成5个方剂合成',
      icon: FlaskConical,
      requirement: 5,
      progress: gameState.completedFormulas.length,
      reward: '800积分',
      category: '合成'
    },
    {
      id: 'formula_intermediate',
      name: '方剂大师',
      description: '完成10个方剂合成',
      icon: FlaskConical,
      requirement: 10,
      progress: gameState.completedFormulas.length,
      reward: '2000积分',
      category: '合成'
    },
    {
      id: 'formula_master',
      name: '医圣传人',
      description: '完成全部20个方剂合成',
      icon: Star,
      requirement: 20,
      progress: gameState.completedFormulas.length,
      reward: '8000积分',
      category: '合成'
    },
    {
      id: 'explorer',
      name: '游历四方',
      description: '访问所有区域',
      icon: Map,
      requirement: 3,
      progress: 1,
      reward: '1000积分',
      category: '探索'
    },
    {
      id: 'score_1000',
      name: '初露锋芒',
      description: '获得1000积分',
      icon: Trophy,
      requirement: 1000,
      progress: Math.min(gameState.score, 1000),
      reward: '称号：初学者',
      category: '积分'
    },
    {
      id: 'score_5000',
      name: '崭露头角',
      description: '获得5000积分',
      icon: Trophy,
      requirement: 5000,
      progress: Math.min(gameState.score, 5000),
      reward: '称号：学徒',
      category: '积分'
    },
    {
      id: 'score_10000',
      name: '名扬四海',
      description: '获得10000积分',
      icon: Star,
      requirement: 10000,
      progress: Math.min(gameState.score, 10000),
      reward: '称号：名医',
      category: '积分'
    }
  ];

  const categories = ['全部', '收集', '合成', '探索', '积分'];

  const filteredAchievements = selectedCategory === '全部'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const completedCount = achievements.filter(a => a.progress >= a.requirement).length;

  return (
    <div className="@container p-4 @md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl @md:text-4xl font-bold gradient-text mb-2">成就系统</h1>
          <p className="text-muted-foreground">
            已完成 {completedCount} / {achievements.length} 个成就
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>总体进度</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">成就完成度</span>
                <span className="text-sm font-medium">
                  {Math.round((completedCount / achievements.length) * 100)}%
                </span>
              </div>
              <Progress value={(completedCount / achievements.length) * 100} />
            </div>

            <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{gameState.level}</div>
                <div className="text-sm text-muted-foreground">等级</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{gameState.score}</div>
                <div className="text-sm text-muted-foreground">总积分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{gameState.collectedHerbs.length}</div>
                <div className="text-sm text-muted-foreground">收集药材</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{gameState.completedFormulas.length}</div>
                <div className="text-sm text-muted-foreground">完成方剂</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
          {filteredAchievements.map(achievement => {
            const Icon = achievement.icon;
            const isCompleted = achievement.progress >= achievement.requirement;
            const progressPercent = Math.min((achievement.progress / achievement.requirement) * 100, 100);

            return (
              <Card
                key={achievement.id}
                className={`transition-all ${
                  isCompleted ? 'shadow-elegant ring-2 ring-primary/20' : 'opacity-75'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                        {achievement.name}
                      </CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </div>
                    {isCompleted && (
                      <Trophy className="w-6 h-6 text-secondary" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-muted-foreground">进度</span>
                      <span className="font-medium">
                        {achievement.progress} / {achievement.requirement}
                      </span>
                    </div>
                    <Progress value={progressPercent} />
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{achievement.category}</Badge>
                    <Badge variant={isCompleted ? 'default' : 'secondary'}>
                      {achievement.reward}
                    </Badge>
                  </div>

                  {isCompleted && (
                    <Badge className="w-full justify-center bg-gradient-secondary">
                      ✓ 已完成
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
