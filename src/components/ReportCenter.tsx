
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { MetricsDashboard } from './MetricsDashboard';
import { SearchAndFilters } from './SearchAndFilters';
import { ReportGrid } from './ReportGrid';
import { TaskLogsSidebar } from './TaskLogsSidebar';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { mockReports, Report } from './mockData';

interface ReportCenterProps {
  isTaskModalOpen?: boolean;
  setIsTaskModalOpen?: (isOpen: boolean) => void;
}

const ReportCenterContent: React.FC<ReportCenterProps> = ({ 
  isTaskModalOpen = false, 
  setIsTaskModalOpen = () => {} 
}) => {
  const { theme } = useTheme();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isLogsSidebarOpen, setIsLogsSidebarOpen] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubscribe = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, isSubscribed: !report.isSubscribed, subscriberCount: report.isSubscribed ? report.subscriberCount - 1 : report.subscriberCount + 1 }
        : report
    ));
  };

  const handleCreateTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleViewLogs = (reportId: string) => {
    setSelectedTaskId(reportId);
    setIsLogsSidebarOpen(true);
  };

  const handleCloseLogs = () => {
    setIsLogsSidebarOpen(false);
    setSelectedTaskId(null);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0A0A0B 0%, #1A1A1B 50%, #0F0F10 100%)'
      : 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #F8F9FA 100%)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    marginRight: isLogsSidebarOpen ? '600px' : '0'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme === 'dark'
      ? 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      : 'radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
    pointerEvents: 'none',
    animation: 'float 20s ease-in-out infinite'
  };

  const selectedTask = selectedTaskId ? reports.find(r => r.id === selectedTaskId) : null;

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header onCreateTask={handleCreateTask} />
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <MetricsDashboard reports={reports} />
          <SearchAndFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <ReportGrid 
            reports={filteredReports}
            viewMode={viewMode}
            onSubscribe={handleSubscribe}
            onViewLogs={handleViewLogs}
          />
        </div>
      </div>

      {isLogsSidebarOpen && selectedTask && (
        <TaskLogsSidebar
          task={selectedTask}
          isOpen={isLogsSidebarOpen}
          onClose={handleCloseLogs}
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
      `}</style>
    </div>
  );
};

export const ReportCenter: React.FC<ReportCenterProps> = (props) => {
  return (
    <ThemeProvider>
      <ReportCenterContent {...props} />
    </ThemeProvider>
  );
};
