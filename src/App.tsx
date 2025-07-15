
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from './components/ThemeProvider';
import { Sidebar } from './components/Sidebar';
import { Index } from './pages/Index';
import { AplusRiskManagement } from './pages/AplusRiskManagement';
import { GovernancePage } from './pages/GovernancePage';
import { EntityDetailPage } from './pages/EntityDetailPage';
import { NotFound } from './pages/NotFound';
import { EntityRiskDetailPage } from './pages/EntityRiskDetailPage';
import { RiskFindingDashboard } from './pages/RiskFindingDashboard';
import { TaskReportDetailPage } from './pages/TaskReportDetailPage';
import { TrafficHighlighterPage } from './pages/TrafficHighlighterPage';

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
                <Route path="/" element={<Navigate to="/sentinel/report-center" replace />} />
                <Route path="/sentinel/report-center" element={<Index />} />
                <Route path="/aplus" element={<Navigate to="/aplus/enhancement" replace />} />
                <Route path="/aplus/enhancement" element={<AplusRiskManagement />} />
                <Route path="/aplus/finding" element={<RiskFindingDashboard />} />
                <Route path="/aplus/traffic-highlighter" element={<TrafficHighlighterPage />} />
                <Route path="/risk-finding" element={<Navigate to="/aplus/finding" replace />} />
                <Route path="/governance/:id" element={<GovernancePage />} />
                <Route path="/entity/:id" element={<EntityDetailPage />} />
                <Route path="/entity/:entityId/risk/:riskId" element={<EntityRiskDetailPage />} />
                <Route path="/tasks/:id/report" element={<TaskReportDetailPage />} />
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
