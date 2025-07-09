
import React from 'react';
import { Report } from './mockData';

interface CleanMetricsDashboardProps {
  reports: Report[];
}

export const CleanMetricsDashboard: React.FC<CleanMetricsDashboardProps> = ({ reports }) => {
  const metrics = [
    {
      label: 'Total Reports',
      value: reports.length,
      color: 'hsl(var(--primary))',
      icon: '📊'
    },
    {
      label: 'Completed',
      value: reports.filter(r => r.status === 'completed').length,
      color: 'hsl(var(--success))',
      icon: '✅'
    },
    {
      label: 'Running',
      value: reports.filter(r => r.status === 'running').length,
      color: 'hsl(var(--primary))',
      icon: '⚡'
    },
    {
      label: 'Queued',
      value: reports.filter(r => r.status === 'queued').length,
      color: 'hsl(var(--warning))',
      icon: '⏳'
    }
  ];

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid hsl(var(--border))',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const accentBarStyle = (color: string): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: color
  });

  const iconStyle = (color: string): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: `${color}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    marginBottom: '12px'
  });

  const valueStyle = (color: string): React.CSSProperties => ({
    fontSize: '24px',
    fontWeight: '700',
    color: color,
    margin: 0,
    lineHeight: '1'
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'hsl(var(--muted-foreground))',
    fontWeight: '500',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      {metrics.map((metric, index) => (
        <div key={metric.label} style={cardStyle}>
          <div style={accentBarStyle(metric.color)} />
          <div style={iconStyle(metric.color)}>{metric.icon}</div>
          <div style={valueStyle(metric.color)}>{metric.value}</div>
          <div style={labelStyle}>{metric.label}</div>
        </div>
      ))}
    </div>
  );
};
