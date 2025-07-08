
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

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' 
      ? 'hsl(220 15% 9%)'
      : 'hsl(0 0% 100%)',
    border: `1px solid ${theme === 'dark' 
      ? 'hsl(220 15% 18%)'
      : 'hsl(220 13% 91%)'}`,
    borderRadius: '12px',
    boxShadow: theme === 'dark'
      ? '0 1px 3px rgba(0, 0, 0, 0.3)'
      : '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
    position: 'relative' as const,
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    animation: `fade-in 0.4s ease-out ${animationDelay}ms both`,
    cursor: 'pointer'
  };

  const statusBorderStyle: React.CSSProperties = {
    height: '3px',
    width: '100%',
    backgroundColor: 
      report.status === 'completed' ? 'hsl(142 76% 36%)' :
      report.status === 'running' ? 'hsl(221 83% 53%)' :
      report.status === 'error' ? 'hsl(0 84% 60%)' :
      report.status === 'queued' ? 'hsl(43 96% 56%)' :
      'hsl(220 9% 46%)'
  };

  const contentStyle: React.CSSProperties = {
    padding: '1.5rem'
  };

  const descriptionStyle: React.CSSProperties = {
    color: theme === 'dark' ? 'hsl(220 9% 65%)' : 'hsl(220 9% 46%)',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1.5rem'
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
    flexWrap: 'wrap' as const
  };

  const buttonStyle: React.CSSProperties = {
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: theme === 'dark' 
      ? 'hsl(220 15% 12%)'
      : 'hsl(220 13% 97%)',
    color: theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'hsl(221 83% 53%)',
    color: 'hsl(0 0% 98%)',
    border: 'none'
  };

  const exportDropdownStyle: React.CSSProperties = {
    position: 'relative' as const
  };

  const dropdownContentStyle: React.CSSProperties = {
    position: 'absolute' as const,
    top: '40px',
    right: '0',
    backgroundColor: theme === 'dark'
      ? 'hsl(220 15% 9%)'
      : 'hsl(0 0% 100%)',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    borderRadius: '8px',
    boxShadow: theme === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.4)'
      : '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
    minWidth: '200px',
    padding: '8px'
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)',
    transition: 'background-color 0.2s ease'
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
        <div style={statusBorderStyle} />
        <div style={contentStyle}>
          <ReportHeader title={report.title} status={report.status} />
          
          <p style={descriptionStyle}>{report.description}</p>
          
          <div style={actionButtonsStyle}>
            <button
              style={primaryButtonStyle}
              onClick={handleViewDetails}
              title="View full report details"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(221 83% 48%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(221 83% 53%)';
              }}
            >
              <Eye size={16} />
              View Details
            </button>
            
            <div style={exportDropdownStyle}>
              <button
                style={buttonStyle}
                onClick={handleExportClick}
                title="Export report and evidences"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' 
                    ? 'hsl(220 15% 18%)' 
                    : 'hsl(220 13% 94%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark'
                    ? 'hsl(220 15% 12%)'
                    : 'hsl(220 13% 97%)';
                }}
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
                      (e.target as HTMLElement).style.backgroundColor = theme === 'dark' 
                        ? 'hsl(220 15% 18%)' 
                        : 'hsl(220 13% 94%)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    Download Complete Package
                  </div>
                  <div 
                    style={dropdownItemStyle}
                    onClick={() => handleExportOption('PDF Report')}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = theme === 'dark' 
                        ? 'hsl(220 15% 18%)' 
                        : 'hsl(220 13% 94%)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    Download PDF Report Only
                  </div>
                  <div 
                    style={dropdownItemStyle}
                    onClick={() => handleExportOption('Support Evidences')}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = theme === 'dark' 
                        ? 'hsl(220 15% 18%)' 
                        : 'hsl(220 13% 94%)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' 
                  ? 'hsl(220 15% 18%)' 
                  : 'hsl(220 13% 94%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark'
                  ? 'hsl(220 15% 12%)'
                  : 'hsl(220 13% 97%)';
              }}
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
