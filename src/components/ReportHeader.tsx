
import React from 'react';
import { useTheme } from './ThemeProvider';
import { ReportStatusBadge } from './ReportStatusBadge';

interface ReportHeaderProps {
  title: string;
  status: string;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ title, status }) => {
  const { theme } = useTheme();

  const titleRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: theme === 'dark' ? '#F3F4F6' : '#111827',
    margin: 0,
    flex: 1
  };

  return (
    <div style={titleRowStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <ReportStatusBadge status={status} />
    </div>
  );
};
