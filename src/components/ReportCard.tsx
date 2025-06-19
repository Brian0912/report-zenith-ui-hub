import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
import { TimeRangeSelector } from './TimeRangeSelector';
import { DateSelector } from './DateSelector';

interface ReportCardProps {
  report: Report;
  viewMode: 'grid' | 'list';
  onSubscribe: (reportId: string) => void;
  animationDelay: number;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, viewMode, onSubscribe, animationDelay }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [timeRange, setTimeRange] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: Date; end: Date } | undefined>();

  const getStatusConfig = (status: string) => {
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

  const statusConfig = getStatusConfig(report.status);

  const cardStyle: React.CSSProperties = {
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative' as const,
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    animation: `fade-in 0.5s ease-out ${animationDelay}ms both`,
    cursor: 'pointer'
  };

  const statusHeaderStyle: React.CSSProperties = {
    background: statusConfig.gradient,
    height: '4px',
    width: '100%'
  };

  const contentStyle: React.CSSProperties = {
    padding: '1.5rem'
  };

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

  const descriptionStyle: React.CSSProperties = {
    color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1rem'
  };

  const metaRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const contactStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const avatarStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: statusConfig.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.875rem',
    position: 'relative' as const
  };

  const onlineIndicatorStyle: React.CSSProperties = {
    position: 'absolute' as const,
    bottom: '2px',
    right: '2px',
    width: '12px',
    height: '12px',
    background: report.pointOfContact.isOnline ? '#10B981' : '#6B7280',
    borderRadius: '50%',
    border: '2px solid white',
    animation: report.pointOfContact.isOnline ? 'pulse 2s ease-in-out infinite' : 'none'
  };

  const contactInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const
  };

  const contactNameStyle: React.CSSProperties = {
    fontWeight: '600',
    color: theme === 'dark' ? '#F3F4F6' : '#111827',
    fontSize: '0.875rem'
  };

  const contactRoleStyle: React.CSSProperties = {
    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    fontSize: '0.75rem'
  };

  const versionBadgeStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: theme === 'dark' ? '#D1D5DB' : '#6B7280'
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
    background: statusConfig.gradient,
    width: `${report.progress}%`,
    transition: 'width 1s ease-out',
    borderRadius: '4px'
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
    background: report.isSubscribed
      ? statusConfig.gradient
      : (theme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'),
    color: report.isSubscribed
      ? 'white'
      : (theme === 'dark' ? '#D1D5DB' : '#6B7280'),
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '0.875rem',
    fontWeight: '500',
    animation: report.isSubscribed ? 'pulse 2s ease-in-out infinite' : 'none'
  };

  const handleTimeRangeChange = (range: { start: Date; end: Date }) => {
    setTimeRange(range);
    console.log('Time range selected:', range);
  };

  const handleDateRangeChange = (dateRange: { start: Date; end: Date } | undefined) => {
    setSelectedDateRange(dateRange);
    console.log('Date range selected:', dateRange);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={statusHeaderStyle} />
      <div style={contentStyle}>
        <div style={titleRowStyle}>
          <h3 style={titleStyle}>{report.title}</h3>
          <div style={statusBadgeStyle}>
            <span>{statusConfig.icon}</span>
            <span>{report.status}</span>
          </div>
        </div>
        
        <p style={descriptionStyle}>{report.description}</p>
        
        <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />
        <DateSelector onDateChange={handleDateRangeChange} />
        
        <div style={metaRowStyle}>
          <div style={contactStyle}>
            <div style={avatarStyle}>
              {report.pointOfContact.avatar}
              <div style={onlineIndicatorStyle} />
            </div>
            <div style={contactInfoStyle}>
              <div style={contactNameStyle}>{report.pointOfContact.name}</div>
              <div style={contactRoleStyle}>{report.pointOfContact.role}</div>
            </div>
          </div>
          <div style={versionBadgeStyle}>{report.version}</div>
        </div>

        <div style={progressBarStyle}>
          <div style={progressFillStyle} />
        </div>

        <div style={footerStyle}>
          <div style={tagsStyle}>
            {report.tags.slice(0, 3).map(tag => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
          <button
            style={subscribeButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe(report.id);
            }}
            onMouseEnter={(e) => {
              if (!report.isSubscribed) {
                e.currentTarget.style.background = theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!report.isSubscribed) {
                e.currentTarget.style.background = theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <span>{report.isSubscribed ? '🔔' : '🔕'}</span>
            <span>{report.subscriberCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
