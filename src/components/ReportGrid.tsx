
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
import { ReportCard } from './ReportCard';

interface ReportGridProps {
  reports: Report[];
  onSubscribe: (reportId: string) => void;
  onViewLogs: (reportId: string) => void;
}

export const ReportGrid: React.FC<ReportGridProps> = ({ 
  reports, 
  onSubscribe,
  onViewLogs 
}) => {
  const { theme } = useTheme();

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
    gap: '20px',
    animation: 'fade-in 0.5s ease-out',
    padding: '8px 0'
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const emptyIconStyle: React.CSSProperties = {
    fontSize: '4rem',
    marginBottom: '1rem',
    opacity: 0.6
  };

  const emptyTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const emptyDescStyle: React.CSSProperties = {
    color: '#6B7280',
    fontSize: '1rem'
  };

  if (reports.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <div style={emptyIconStyle}>🔍</div>
        <h3 style={emptyTitleStyle}>No reports found</h3>
        <p style={emptyDescStyle}>
          Try adjusting your search terms or filters to find the reports you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div style={gridStyle}>
      {reports.map((report, index) => (
        <ReportCard
          key={report.id}
          report={report}
          viewMode="grid"
          onSubscribe={onSubscribe}
          onViewLogs={onViewLogs}
          animationDelay={index * 100}
        />
      ))}
    </div>
  );
};
