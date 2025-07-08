
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
    gap: '1rem',
    marginBottom: '2rem'
  };

  const createMetricCardStyle = (gradientColors: string[]): React.CSSProperties => ({
    background: theme === 'dark'
      ? `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`
      : `linear-gradient(135deg, ${gradientColors[2]} 0%, ${gradientColors[3]} 100%)`,
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    padding: '1rem',
    border: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme === 'dark'
      ? '0 6px 24px rgba(0, 0, 0, 0.25)'
      : '0 6px 24px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden'
  });

  const MetricCard: React.FC<{
    title: string;
    value: number;
    suffix?: string;
    icon: string;
    gradientColors: string[];
    isAnimated?: boolean;
  }> = ({ title, value, suffix = '', icon, gradientColors, isAnimated = false }) => {
    const cardStyle = createMetricCardStyle(gradientColors);
    
    const valueStyle: React.CSSProperties = {
      fontSize: '2rem',
      fontWeight: '800',
      color: 'white',
      margin: '0.4rem 0',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      animation: isAnimated ? 'pulse 2s ease-in-out infinite' : 'none'
    };

    const titleStyle: React.CSSProperties = {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      margin: 0
    };

    const iconStyle: React.CSSProperties = {
      fontSize: '1.5rem',
      marginBottom: '0.4rem',
      display: 'block'
    };

    return (
      <div 
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.35)'
            : '0 8px 32px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? '0 6px 24px rgba(0, 0, 0, 0.25)'
            : '0 6px 24px rgba(0, 0, 0, 0.08)';
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
        gradientColors={['rgba(16, 185, 129, 0.9)', 'rgba(20, 184, 166, 0.9)', 'rgba(5, 150, 105, 0.9)', 'rgba(13, 148, 136, 0.9)']}
      />
      <MetricCard
        title="Success Rate"
        value={animatedValues.successRate}
        suffix="%"
        icon="✅"
        gradientColors={['rgba(59, 130, 246, 0.9)', 'rgba(139, 92, 246, 0.9)', 'rgba(37, 99, 235, 0.9)', 'rgba(124, 58, 237, 0.9)']}
      />
      <MetricCard
        title="Running Reports"
        value={animatedValues.runningReports}
        icon="⚡"
        gradientColors={['rgba(245, 158, 11, 0.9)', 'rgba(234, 88, 12, 0.9)', 'rgba(217, 119, 6, 0.9)', 'rgba(194, 65, 12, 0.9)']}
        isAnimated={runningReports > 0}
      />
      <MetricCard
        title="Issues Detected"
        value={animatedValues.issuesDetected}
        icon="🚨"
        gradientColors={['rgba(244, 63, 94, 0.9)', 'rgba(220, 38, 38, 0.9)', 'rgba(225, 29, 72, 0.9)', 'rgba(185, 28, 28, 0.9)']}
        isAnimated={issuesDetected > 0}
      />
    </div>
  );
};
