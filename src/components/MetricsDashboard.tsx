
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';

interface MetricsDashboardProps {
  reports: Report[];
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ reports }) => {
  const { theme } = useTheme();

  const metrics = [
    {
      label: 'Total Reports',
      value: reports.length,
      color: 'hsl(var(--primary))',
      bgColor: 'hsl(var(--primary) / 0.1)',
      icon: '📊'
    },
    {
      label: 'Completed',
      value: reports.filter(r => r.status === 'completed').length,
      color: 'hsl(var(--success))',
      bgColor: 'hsl(var(--success) / 0.1)',
      icon: '✅'
    },
    {
      label: 'Running',
      value: reports.filter(r => r.status === 'running').length,
      color: 'hsl(217 91% 60%)',
      bgColor: 'hsl(217 91% 60% / 0.1)',
      icon: '⚡'
    },
    {
      label: 'Queued',
      value: reports.filter(r => r.status === 'queued').length,
      color: 'hsl(var(--warning))',
      bgColor: 'hsl(var(--warning) / 0.1)',
      icon: '⏳'
    }
  ];

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem'
  };

  const cardStyle = (bgColor: string): React.CSSProperties => ({
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  });

  const iconContainerStyle = (bgColor: string): React.CSSProperties => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    flexShrink: 0
  });

  const contentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0
  };

  const valueStyle = (color: string): React.CSSProperties => ({
    fontSize: '2rem',
    fontWeight: '700',
    color: color,
    lineHeight: '1',
    marginBottom: '0.25rem'
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'hsl(var(--muted-foreground))',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          style={cardStyle(metric.bgColor)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
          }}
        >
          <div style={iconContainerStyle(metric.bgColor)}>
            {metric.icon}
          </div>
          <div style={contentStyle}>
            <div style={valueStyle(metric.color)}>{metric.value}</div>
            <div style={labelStyle}>{metric.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
