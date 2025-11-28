import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GameProvider } from '@/contexts/GameContext';
import Header from '@/components/common/Header';
import routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <GameProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Toaster position="top-center" richColors />
        </div>
      </GameProvider>
    </Router>
  );
};

export default App;
