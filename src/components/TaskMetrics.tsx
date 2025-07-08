
import React from 'react';
import { useTheme } from './ThemeProvider';

export const TaskMetrics: React.FC = () => {
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '16px',
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: string;
    color: string;
  }> = ({ title, value, icon, color }) => {
    const cardStyle: React.CSSProperties = {
      background: theme === 'dark' 
        ? 'rgba(45, 55, 72, 0.6)'
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px',
      border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.2s ease',
    };

    const iconStyle: React.CSSProperties = {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
    };

    const valueStyle: React.CSSProperties = {
      fontSize: '24px',
      fontWeight: '700',
      color: theme === 'dark' ? '#ffffff' : '#1a202c',
      margin: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: '12px',
      fontWeight: '500',
      color: theme === 'dark' ? '#a0aec0' : '#718096',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: 0,
    };

    return (
      <div 
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? '0 8px 20px rgba(0, 0, 0, 0.4)'
            : '0 8px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={iconStyle}>{icon}</div>
        <div style={contentStyle}>
          <div style={valueStyle}>{value}</div>
          <div style={titleStyle}>{title}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <MetricCard
        title="Active Tasks"
        value="12"
        icon="⚡"
        color="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      />
      <MetricCard
        title="Completed"
        value="48"
        icon="✅"
        color="linear-gradient(135deg, #10b981 0%, #059669 100%)"
      />
      <MetricCard
        title="In Progress"
        value="8"
        icon="🔄"
        color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
      />
      <MetricCard
        title="Success Rate"
        value="94%"
        icon="📊"
        color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
      />
    </div>
  );
};
