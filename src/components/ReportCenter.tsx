
import React, { useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ReportCenterLayout } from './report-center/ReportCenterLayout';
import { mockReports, Report } from './mockData';

interface ReportCenterProps {
  isTaskModalOpen?: boolean;
  setIsTaskModalOpen?: (isOpen: boolean) => void;
}

const ReportCenterContent: React.FC<ReportCenterProps> = ({ 
  isTaskModalOpen = false, 
  setIsTaskModalOpen = () => {} 
}) => {
  const [reports, setReports] = useState<Report[]>(mockReports);

  const handleSubscribe = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
          ...report, 
          isSubscribed: !report.isSubscribed, 
          subscriberCount: report.isSubscribed ? report.subscriberCount - 1 : report.subscriberCount + 1 
        }
        : report
    ));
  };

  const handleCreateTask = () => {
    setIsTaskModalOpen(true);
  };

  return (
    <ReportCenterLayout
      reports={reports}
      onSubscribe={handleSubscribe}
      onCreateTask={handleCreateTask}
    />
  );
};

export const ReportCenter: React.FC<ReportCenterProps> = (props) => {
  return (
    <ThemeProvider>
      <ReportCenterContent {...props} />
    </ThemeProvider>
  );
};
