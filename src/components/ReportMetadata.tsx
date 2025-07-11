import React from 'react';
import { Report } from './mockData';

interface ReportMetadataProps {
  pointOfContact: Report['pointOfContact'];
  version: string;
  status: string;
}

export const ReportMetadata: React.FC<ReportMetadataProps> = ({ pointOfContact, version, status }) => {
  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'completed':
        return 'linear-gradient(135deg, #059669 0%, #0D9488 100%)';
      case 'running':
        return 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)';
      case 'error':
        return 'linear-gradient(135deg, #E11D48 0%, #B91C1C 100%)';
      case 'queued':
        return 'linear-gradient(135deg, #D97706 0%, #C2410C 100%)';
      default:
        return 'linear-gradient(135deg, #4B5563 0%, #374151 100%)';
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
    color: '#111827',
    fontSize: '0.875rem'
  };

  const contactRoleStyle: React.CSSProperties = {
    color: '#6B7280',
    fontSize: '0.75rem'
  };

  const versionBadgeStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6B7280'
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
