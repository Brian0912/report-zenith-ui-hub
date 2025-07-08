
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';

interface MetricsDashboardProps {
  reports: Report[];
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ reports }) => {
  const { theme } = useTheme();
  const [animatedValues, setAnimatedValues] = useState({
    totalReports: 0,
    successRate: 0,
    runningReports: 0,
    issuesDetected: 0
  });

  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === 'completed').length;
  const successRate = totalReports > 0 ? (completedReports / totalReports) * 100 : 0;
  const runningReports = reports.filter(r => r.status === 'running').length;
  const issuesDetected = reports.filter(r => r.status === 'error').length;

  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (end - start) * easeOutQuart;
        callback(Math.round(currentValue));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    animateValue(0, totalReports, 1000, (value) => 
      setAnimatedValues(prev => ({ ...prev, totalReports: value }))
    );
    animateValue(0, successRate, 1200, (value) => 
      setAnimatedValues(prev => ({ ...prev, successRate: value }))
    );
    animateValue(0, runningReports, 800, (value) => 
      setAnimatedValues(prev => ({ ...prev, runningReports: value }))
    );
    animateValue(0, issuesDetected, 600, (value) => 
      setAnimatedValues(prev => ({ ...prev, issuesDetected: value }))
    );
  }, [totalReports, successRate, runningReports, issuesDetected]);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  };

  const MetricCard: React.FC<{
    title: string;
    value: number;
    suffix?: string;
    icon: string;
    color: string;
    isAnimated?: boolean;
  }> = ({ title, value, suffix = '', icon, color, isAnimated = false }) => {
    const cardStyle: React.CSSProperties = {
      backgroundColor: theme === 'dark' 
        ? 'hsl(220 15% 9%)'
        : 'hsl(0 0% 100%)',
      border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
      borderLeft: `4px solid ${color}`
    };

    const valueStyle: React.CSSProperties = {
      fontSize: '2rem',
      fontWeight: '700',
      color: theme === 'dark' ? 'hsl(220 15% 95%)' : 'hsl(220 15% 15%)',
      margin: '0.5rem 0',
      animation: isAnimated ? 'pulse 2s ease-in-out infinite' : 'none'
    };

    const titleStyle: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: theme === 'dark' ? 'hsl(220 9% 65%)' : 'hsl(220 9% 46%)',
      margin: 0
    };

    const iconStyle: React.CSSProperties = {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      display: 'block'
    };

    return (
      <div 
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={iconStyle}>{icon}</div>
        <h3 style={titleStyle}>{title}</h3>
        <div style={valueStyle}>{value}{suffix}</div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <MetricCard
        title="Total Reports"
        value={animatedValues.totalReports}
        icon="📊"
        color="hsl(221 83% 53%)"
      />
      <MetricCard
        title="Success Rate"
        value={animatedValues.successRate}
        suffix="%"
        icon="✅"
        color="hsl(142 76% 36%)"
      />
      <MetricCard
        title="Running Reports"
        value={animatedValues.runningReports}
        icon="⚡"
        color="hsl(43 96% 56%)"
        isAnimated={runningReports > 0}
      />
      <MetricCard
        title="Issues Detected"
        value={animatedValues.issuesDetected}
        icon="🚨"
        color="hsl(0 84% 60%)"
        isAnimated={issuesDetected > 0}
      />
    </div>
  );
};
