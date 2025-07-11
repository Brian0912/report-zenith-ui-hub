
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ReportCenterLayout } from './report-center/ReportCenterLayout';

interface ReportCenterProps {
  isTaskModalOpen?: boolean;
  setIsTaskModalOpen?: (isOpen: boolean) => void;
}

export const ReportCenter: React.FC<ReportCenterProps> = (props) => {
  return (
    <ThemeProvider>
      <ReportCenterLayout {...props} />
    </ThemeProvider>
  );
};
