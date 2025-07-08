
import React from 'react';
import { useTheme } from './ThemeProvider';

interface ReportStatusBadgeProps {
  status: string;
}

export const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ status }) => {
  const { theme } = useTheme();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'hsl(142 76% 36%)',
          icon: '✅',
          animation: 'none'
        };
      case 'running':
        return {
          color: 'hsl(221 83% 53%)',
          icon: '⚡',
          animation: 'pulse 2s ease-in-out infinite'
        };
      case 'error':
        return {
          color: 'hsl(0 84% 60%)',
          icon: '🚨',
          animation: 'bounce 1s ease-in-out infinite'
        };
      case 'queued':
        return {
          color: 'hsl(43 96% 56%)',
          icon: '⏳',
          animation: 'pulse 3s ease-in-out infinite'
        };
      default:
        return {
          color: 'hsl(220 9% 46%)',
          icon: '❓',
          animation: 'none'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const statusBadgeStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '6px',
    backgroundColor: `${statusConfig.color}15`,
    color: statusConfig.color,
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    animation: statusConfig.animation,
    border: `1px solid ${statusConfig.color}30`
  };

  return (
    <div style={statusBadgeStyle}>
      <span>{statusConfig.icon}</span>
      <span>{status}</span>
    </div>
  );
};
