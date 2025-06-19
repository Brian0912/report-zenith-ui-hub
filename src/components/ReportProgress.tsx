
import React from 'react';
import { useTheme } from './ThemeProvider';

interface ReportProgressProps {
  progress: number;
  status: string;
}

export const ReportProgress: React.FC<ReportProgressProps> = ({ progress, status }) => {
  const { theme } = useTheme();

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'completed':
        return theme === 'dark' 
          ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
          : 'linear-gradient(135deg, #059669 0%, #0D9488 100%)';
      case 'running':
        return theme === 'dark'
          ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
          : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)';
      case 'error':
        return theme === 'dark'
          ? 'linear-gradient(135deg, #F43F5E 0%, #DC2626 100%)'
          : 'linear-gradient(135deg, #E11D48 0%, #B91C1C 100%)';
      case 'queued':
        return theme === 'dark'
          ? 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)'
          : 'linear-gradient(135deg, #D97706 0%, #C2410C 100%)';
      default:
        return theme === 'dark'
          ? 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
          : 'linear-gradient(135deg, #4B5563 0%, #374151 100%)';
    }
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '1rem'
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    background: getStatusGradient(status),
    width: `${progress}%`,
    transition: 'width 1s ease-out',
    borderRadius: '4px'
  };

  return (
    <div style={progressBarStyle}>
      <div style={progressFillStyle} />
    </div>
  );
};
