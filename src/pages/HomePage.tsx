import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Map, BookOpen, FlaskConical, Users, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

export default function HomePage() {
  const { gameState } = useGame();

  const features = [
    {
      icon: Sparkles,
      title: '方剂合成',
      description: '收集药材，合成经典方剂',
      link: '/game'
    },
    {
      icon: Map,
      title: '世界探索',
      description: '游历山林草原，采集珍稀药材',
      link: '/map'
    },
    {
      icon: BookOpen,
      title: '本草图谱',
      description: '学习中药知识，记录采集进度',
      link: '/herbs'
    },
    {
      icon: FlaskConical,
      title: '方剂大全',
      description: '研习经典方剂，掌握配伍之道',
      link: '/formulas'
    },
    {
      icon: Users,
      title: '拜访名医',
      description: '向医圣请教，获得智慧指引',
      link: '/npc'
    },
    {
      icon: Trophy,
      title: '成就系统',
      description: '完成挑战，解锁荣誉成就',
      link: '/achievements'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="@container">
        <div className="flex flex-col @md:flex-row items-center justify-center min-h-[60vh] px-4 py-12 @md:py-20">
          <div className="flex-1 text-center @md:text-left mb-8 @md:mb-0">
            <h1 className="text-4xl @md:text-6xl font-bold mb-4 gradient-text">
              神农百草录
            </h1>
            <p className="text-lg @md:text-xl text-muted-foreground mb-8 max-w-2xl">
              一款深度融合中医药知识的沉浸式消除游戏
              <br />
              通过创新的方剂合成机制，体验中医药文化的独特魅力
            </p>
            <div className="flex flex-col @sm:flex-row gap-4 justify-center @md:justify-start">
              <Link to="/game">
                <Button size="lg" className="w-full @sm:w-auto">
                  开始游戏
                </Button>
              </Link>
              <Link to="/herbs">
                <Button size="lg" variant="outline" className="w-full @sm:w-auto">
                  浏览图谱
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <Card className="w-full max-w-md shadow-elegant">
              <CardHeader>
                <CardTitle>游戏进度</CardTitle>
                <CardDescription>继续你的中医药探索之旅</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">等级</span>
                  <span className="text-2xl font-bold text-primary">{gameState.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">积分</span>
                  <span className="text-2xl font-bold text-secondary">{gameState.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">已收集药材</span>
                  <span className="text-xl font-semibold">{gameState.collectedHerbs.length} / 50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">已完成方剂</span>
                  <span className="text-xl font-semibold">{gameState.completedFormulas.length} / 20</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">游戏特色</h2>
          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">关于游戏</h2>
            <p className="text-lg text-muted-foreground mb-6">
              《神农百草录》是一款将中医药文化与现代游戏机制完美结合的教育娱乐游戏。
              游戏以神农尝百草的传说为背景，玩家将扮演一位中医药学徒，
              通过采集药材、合成方剂、拜访名医等方式，逐步掌握中医药知识。
            </p>
            <p className="text-lg text-muted-foreground">
              游戏收录了50种常用中药材和20个经典方剂，
              每种药材都有详细的性味归经、功效主治等信息。
              通过游戏化的学习方式，让玩家在娱乐中了解中医药文化的博大精深。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
