
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, List, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
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
  onViewLogs: (reportId: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ 
  report, 
  viewMode, 
  onSubscribe, 
  animationDelay,
  onViewLogs 
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
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

  const actionButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const
  };

  const buttonStyle: React.CSSProperties = {
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)',
    color: theme === 'dark' ? '#F3F4F6' : '#374151'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: theme === 'dark'
      ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
      : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    color: 'white'
  };

  const exportDropdownStyle: React.CSSProperties = {
    position: 'relative' as const
  };

  const dropdownContentStyle: React.CSSProperties = {
    position: 'absolute' as const,
    top: '40px',
    right: '0',
    background: theme === 'dark'
      ? 'rgba(30, 30, 30, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    minWidth: '200px',
    padding: '8px'
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    transition: 'background 0.2s ease'
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/tasks/${report.id}/report`);
  };

  const handleExportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowExportDropdown(!showExportDropdown);
  };

  const handleExportOption = (option: string) => {
    startDownload(`${report.title} - ${option}`, report.id);
    setShowExportDropdown(false);
  };

  const handleViewLogs = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewLogs(report.id);
  };

  const handleSubscribe = () => {
    onSubscribe(report.id);
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
          
          <div style={actionButtonsStyle}>
            <button
              style={primaryButtonStyle}
              onClick={handleViewDetails}
              title="View full report details"
            >
              <Eye size={16} />
              View Details
            </button>
            
            <div style={exportDropdownStyle}>
              <button
                style={buttonStyle}
                onClick={handleExportClick}
                title="Export report and evidences"
              >
                <Download size={16} />
                Export
                <ChevronDown size={14} />
              </button>
              
              {showExportDropdown && (
                <div style={dropdownContentStyle}>
                  <div 
                    style={dropdownItemStyle}
                    onClick={() => handleExportOption('Complete Package')}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    Download Complete Package
                  </div>
                  <div 
                    style={dropdownItemStyle}
                    onClick={() => handleExportOption('PDF Report')}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    Download PDF Report Only
                  </div>
                  <div 
                    style={dropdownItemStyle}
                    onClick={() => handleExportOption('Support Evidences')}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    Download Support Evidences
                  </div>
                </div>
              )}
            </div>
            
            <button
              style={buttonStyle}
              onClick={handleViewLogs}
              title="View task execution logs"
            >
              <List size={16} />
              View Logs
            </button>
          </div>
          
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
