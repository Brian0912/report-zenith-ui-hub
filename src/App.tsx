
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import AplusRiskManagement from "./pages/AplusRiskManagement";
import GovernancePage from "./pages/GovernancePage";
import EntityDetailPage from "./pages/EntityDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div style={{ minHeight: '100vh', display: 'flex', width: '100%' }}>
              <AppSidebar />
              <SidebarInset>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sentinel" element={<Index />} />
                  <Route path="/aplus-risk-management" element={<AplusRiskManagement />} />
                  <Route path="/governance/:governanceId" element={<GovernancePage />} />
                  <Route path="/entity/:entityId" element={<EntityDetailPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
