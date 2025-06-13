
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from './components/ThemeProvider';
import { Sidebar } from './components/Sidebar';
import { Index } from './pages/Index';
import { AplusRiskManagement } from './pages/AplusRiskManagement';
import { GovernancePage } from './pages/GovernancePage';
import { EntityDetailPage } from './pages/EntityDetailPage';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Sidebar />
            <main style={{ flex: 1, overflow: 'auto' }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/aplus" element={<AplusRiskManagement />} />
                <Route path="/governance/:id" element={<GovernancePage />} />
                <Route path="/entity/:id" element={<EntityDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
