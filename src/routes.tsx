import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import MapPage from './pages/MapPage';
import HerbsPage from './pages/HerbsPage';
import FormulasPage from './pages/FormulasPage';
import NPCPage from './pages/NPCPage';
import AchievementsPage from './pages/AchievementsPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <HomePage />,
    visible: true
  },
  {
    name: '开始游戏',
    path: '/game',
    element: <GamePage />,
    visible: true
  },
  {
    name: '世界地图',
    path: '/map',
    element: <MapPage />,
    visible: true
  },
  {
    name: '本草图谱',
    path: '/herbs',
    element: <HerbsPage />,
    visible: true
  },
  {
    name: '方剂大全',
    path: '/formulas',
    element: <FormulasPage />,
    visible: true
  },
  {
    name: '拜访名医',
    path: '/npc',
    element: <NPCPage />,
    visible: true
  },
  {
    name: '成就系统',
    path: '/achievements',
    element: <AchievementsPage />,
    visible: true
  }
];

export default routes;