
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';

interface ReportMetadataProps {
  pointOfContact: Report['pointOfContact'];
  version: string;
  status: string;
}

export const ReportMetadata: React.FC<ReportMetadataProps> = ({ pointOfContact, version, status }) => {
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
    background: getStatusGradient(status),
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
    background: pointOfContact.isOnline ? '#10B981' : '#6B7280',
    borderRadius: '50%',
    border: '2px solid white',
    animation: pointOfContact.isOnline ? 'pulse 2s ease-in-out infinite' : 'none'
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

  return (
    <div style={metaRowStyle}>
      <div style={contactStyle}>
        <div style={avatarStyle}>
          {pointOfContact.avatar}
          <div style={onlineIndicatorStyle} />
        </div>
        <div style={contactInfoStyle}>
          <div style={contactNameStyle}>{pointOfContact.name}</div>
          <div style={contactRoleStyle}>{pointOfContact.role}</div>
        </div>
      </div>
      <div style={versionBadgeStyle}>{version}</div>
    </div>
  );
};
