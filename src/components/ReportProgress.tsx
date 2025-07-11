
import React from 'react';

interface ReportProgressProps {
  progress: number;
  status: string;
}

export const ReportProgress: React.FC<ReportProgressProps> = ({ progress, status }) => {
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

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    background: 'rgba(0, 0, 0, 0.1)',
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
