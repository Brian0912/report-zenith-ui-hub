
import React from 'react';
import { useTheme } from './ThemeProvider';

interface ReportFooterProps {
  tags: string[];
  isSubscribed: boolean;
  subscriberCount: number;
  onSubscribe: () => void;
  status: string;
}

export const ReportFooter: React.FC<ReportFooterProps> = ({ 
  tags, 
  isSubscribed, 
  subscriberCount, 
  onSubscribe, 
  status 
}) => {
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

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)'
  };

  const tagsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const
  };

  const tagStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    background: theme === 'dark'
      ? 'rgba(16, 185, 129, 0.2)'
      : 'rgba(5, 150, 105, 0.2)',
    color: theme === 'dark' ? '#10B981' : '#059669',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500'
  };

  const subscribeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    background: isSubscribed
      ? getStatusGradient(status)
      : (theme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'),
    color: isSubscribed
      ? 'white'
      : (theme === 'dark' ? '#D1D5DB' : '#6B7280'),
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '0.875rem',
    fontWeight: '500',
    animation: isSubscribed ? 'pulse 2s ease-in-out infinite' : 'none'
  };

  return (
    <div style={footerStyle}>
      <div style={tagsStyle}>
        {tags.slice(0, 3).map(tag => (
          <span key={tag} style={tagStyle}>{tag}</span>
        ))}
      </div>
      <button
        style={subscribeButtonStyle}
        onClick={(e) => {
          e.stopPropagation();
          onSubscribe();
        }}
        onMouseEnter={(e) => {
          if (!isSubscribed) {
            e.currentTarget.style.background = theme === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubscribed) {
            e.currentTarget.style.background = theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        <span>{isSubscribed ? '🔔' : '🔕'}</span>
        <span>{subscriberCount}</span>
      </button>
    </div>
  );
};
