
import React from 'react';
import { CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';

interface ReportStatusBadgeProps {
  status: string;
}

export const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          backgroundColor: '#10B981',
          color: 'white',
          icon: CheckCircle,
          text: 'COMPLETED'
        };
      case 'running':
        return {
          backgroundColor: '#4F46E5',
          color: 'white',
          icon: Loader,
          text: 'RUNNING'
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          color: 'white',
          icon: AlertCircle,
          text: 'ERROR'
        };
      case 'queued':
        return {
          backgroundColor: '#F59E0B',
          color: 'white',
          icon: Clock,
          text: 'QUEUED'
        };
      default:
        return {
          backgroundColor: '#6B7280',
          color: 'white',
          icon: Clock,
          text: 'UNKNOWN'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const badgeStyle: React.CSSProperties = {
    height: '24px',
    borderRadius: '12px',
    padding: '4px 12px',
    backgroundColor: config.backgroundColor,
    color: config.color,
    fontSize: '12px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={badgeStyle}>
      <Icon size={12} />
      {config.text}
    </div>
  );
};
