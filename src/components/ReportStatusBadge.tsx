
import React from 'react';
import { useTheme } from './ThemeProvider';

interface StatusConfig {
  color: string;
  gradient: string;
  icon: string;
  animation: string;
}

interface ReportStatusBadgeProps {
  status: string;
}

export const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ status }) => {
  const { theme } = useTheme();

  const getStatusConfig = (status: string): StatusConfig => {
    switch (status) {
      case 'completed':
        return {
          color: theme === 'dark' ? '#10B981' : '#059669',
          gradient: theme === 'dark' 
            ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
            : 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
          icon: '✅',
          animation: 'none'
        };
      case 'running':
        return {
          color: theme === 'dark' ? '#3B82F6' : '#2563EB',
          gradient: theme === 'dark'
            ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
            : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          icon: '⚡',
          animation: 'pulse 2s ease-in-out infinite'
        };
      case 'error':
        return {
          color: theme === 'dark' ? '#F43F5E' : '#E11D48',
          gradient: theme === 'dark'
            ? 'linear-gradient(135deg, #F43F5E 0%, #DC2626 100%)'
            : 'linear-gradient(135deg, #E11D48 0%, #B91C1C 100%)',
          icon: '🚨',
          animation: 'bounce 1s ease-in-out infinite'
        };
      case 'queued':
        return {
          color: theme === 'dark' ? '#F59E0B' : '#D97706',
          gradient: theme === 'dark'
            ? 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)'
            : 'linear-gradient(135deg, #D97706 0%, #C2410C 100%)',
          icon: '⏳',
          animation: 'pulse 3s ease-in-out infinite'
        };
      default:
        return {
          color: theme === 'dark' ? '#6B7280' : '#4B5563',
          gradient: theme === 'dark'
            ? 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
            : 'linear-gradient(135deg, #4B5563 0%, #374151 100%)',
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
    padding: '0.375rem 0.75rem',
    borderRadius: '8px',
    background: statusConfig.gradient,
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    animation: statusConfig.animation
  };

  return (
    <div style={statusBadgeStyle}>
      <span>{statusConfig.icon}</span>
      <span>{status}</span>
    </div>
  );
};
