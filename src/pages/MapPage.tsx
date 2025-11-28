import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { getHerbsByRegion } from '@/data/herbs';
import { Mountain, Trees, Waves, Sun, Cloud, CloudRain } from 'lucide-react';
import type { RegionType, WeatherType } from '@/types/game';

export default function MapPage() {
  const { gameState, setCurrentRegion, setWeather } = useGame();

  const regions: Array<{
    type: RegionType;
    name: string;
    icon: typeof Mountain;
    description: string;
    color: string;
  }> = [
    {
      type: 'mountain',
      name: '山林区域',
      icon: Mountain,
      description: '生长温性药材，如人参、黄芪、当归等珍贵药材',
      color: 'bg-green-600'
    },
    {
      type: 'grassland',
      name: '草原区域',
      icon: Trees,
      description: '生长平性药材，如甘草、菊花、枸杞等常用药材',
      color: 'bg-amber-500'
    },
    {
      type: 'wetland',
      name: '湿地区域',
      icon: Waves,
      description: '生长凉性药材，如茯苓、泽泻、半夏等祛湿药材',
      color: 'bg-blue-500'
    }
  ];

  const weathers: Array<{
    type: WeatherType;
    name: string;
    icon: typeof Sun;
    effect: string;
  }> = [
    {
      type: 'sunny',
      name: '晴天',
      icon: Sun,
      effect: '阳刚药材生长更好'
    },
    {
      type: 'cloudy',
      name: '阴天',
      icon: Cloud,
      effect: '平性药材品质提升'
    },
    {
      type: 'rainy',
      name: '雨天',
      icon: CloudRain,
      effect: '湿性药材品质提升'
    }
  ];

  const handleRegionChange = (region: RegionType) => {
    setCurrentRegion(region);
  };

  const handleWeatherChange = (weather: WeatherType) => {
    setWeather(weather);
  };

  return (
    <div className="@container p-4 @md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl @md:text-4xl font-bold gradient-text mb-2">世界地图</h1>
          <p className="text-muted-foreground">探索不同区域，采集各类药材</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>当前状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col @md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">当前区域</p>
                <Badge className="text-base px-4 py-2">
                  {regions.find(r => r.type === gameState.currentRegion)?.name}
                </Badge>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">当前天气</p>
                <Badge variant="outline" className="text-base px-4 py-2">
                  {weathers.find(w => w.type === gameState.weather)?.name}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">选择区域</h2>
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
            {regions.map(region => {
              const Icon = region.icon;
              const herbs = getHerbsByRegion(region.type);
              const isCurrentRegion = gameState.currentRegion === region.type;

              return (
                <Card
                  key={region.type}
                  className={`cursor-pointer transition-all hover:shadow-elegant ${
                    isCurrentRegion ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleRegionChange(region.type)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${region.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle>{region.name}</CardTitle>
                    <CardDescription>{region.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        可采集药材：{herbs.length}种
                      </p>
                      {isCurrentRegion && (
                        <Badge className="bg-primary">当前位置</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">天气系统</h2>
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
            {weathers.map(weather => {
              const Icon = weather.icon;
              const isCurrentWeather = gameState.weather === weather.type;

              return (
                <Card
                  key={weather.type}
                  className={`cursor-pointer transition-all hover:shadow-elegant ${
                    isCurrentWeather ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          {weather.name}
                        </CardTitle>
                        <CardDescription>{weather.effect}</CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant={isCurrentWeather ? 'default' : 'outline'}
                        onClick={() => handleWeatherChange(weather.type)}
                      >
                        {isCurrentWeather ? '当前' : '切换'}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>区域药材分布</CardTitle>
            <CardDescription>当前区域可采集的药材</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regions.map(region => {
                const herbs = getHerbsByRegion(region.type);
                return (
                  <div key={region.type}>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <region.icon className="w-4 h-4" />
                      {region.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {herbs.slice(0, 10).map(herb => (
                        <Badge key={herb.id} variant="outline">
                          {herb.name}
                        </Badge>
                      ))}
                      {herbs.length > 10 && (
                        <Badge variant="secondary">+{herbs.length - 10}种</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
