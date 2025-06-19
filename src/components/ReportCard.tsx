import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
import { TimeRangeSelector } from './TimeRangeSelector';
import { DateSelector } from './DateSelector';
import { ReportHeader } from './ReportHeader';
import { ReportMetadata } from './ReportMetadata';
import { ReportProgress } from './ReportProgress';
import { ReportFooter } from './ReportFooter';
import { DownloadProgressModal } from './DownloadProgressModal';
import { useDownload } from '../hooks/useDownload';

interface ReportCardProps {
  report: Report;
  viewMode: 'grid' | 'list';
  onSubscribe: (reportId: string) => void;
  animationDelay: number;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, viewMode, onSubscribe, animationDelay }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [timeRange, setTimeRange] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: Date; end: Date } | undefined>();
  const { downloadProgress, startDownload, cancelDownload } = useDownload();

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

  const cardStyle: React.CSSProperties = {
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative' as const,
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    animation: `fade-in 0.5s ease-out ${animationDelay}ms both`,
    cursor: 'pointer'
  };

  const statusHeaderStyle: React.CSSProperties = {
    background: getStatusGradient(report.status),
    height: '4px',
    width: '100%'
  };

  const contentStyle: React.CSSProperties = {
    padding: '1.5rem'
  };

  const descriptionStyle: React.CSSProperties = {
    color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1rem'
  };

  const downloadButtonStyle: React.CSSProperties = {
    background: theme === 'dark'
      ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
      : 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    marginBottom: '1rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const handleTimeRangeChange = (range: { start: Date; end: Date }) => {
    setTimeRange(range);
    console.log('Time range selected:', range);
  };

  const handleDateRangeChange = (dateRange: { start: Date; end: Date } | undefined) => {
    setSelectedDateRange(dateRange);
    console.log('Date range selected:', dateRange);
  };

  const handleSubscribe = () => {
    onSubscribe(report.id);
  };

  const handleDownload = () => {
    startDownload(report.title, report.id);
  };

  return (
    <>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={statusHeaderStyle} />
        <div style={contentStyle}>
          <ReportHeader title={report.title} status={report.status} />
          
          <p style={descriptionStyle}>{report.description}</p>
          
          <Button
            style={downloadButtonStyle}
            onClick={handleDownload}
            disabled={downloadProgress.isDownloading}
          >
            <IconDownload />
            {downloadProgress.isDownloading ? 'Downloading...' : 'Download Report'}
          </Button>
          
          <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />
          <DateSelector onDateChange={handleDateRangeChange} />
          
          <ReportMetadata 
            pointOfContact={report.pointOfContact}
            version={report.version}
            status={report.status}
          />

          <ReportProgress progress={report.progress} status={report.status} />

          <ReportFooter 
            tags={report.tags}
            isSubscribed={report.isSubscribed}
            subscriberCount={report.subscriberCount}
            onSubscribe={handleSubscribe}
            status={report.status}
          />
        </div>
      </div>

      <DownloadProgressModal
        visible={downloadProgress.isDownloading || downloadProgress.progress === 100}
        progress={downloadProgress}
        onCancel={cancelDownload}
      />
    </>
  );
};
