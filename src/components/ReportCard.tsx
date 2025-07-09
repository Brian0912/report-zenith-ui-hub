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
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
    position: 'relative' as const,
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    cursor: 'pointer'
  };

  const contentStyle: React.CSSProperties = {
    padding: '1.5rem'
  };

  const descriptionStyle: React.CSSProperties = {
    color: 'hsl(var(--muted-foreground))',
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
    border: '1px solid hsl(var(--border))',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none'
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

  const exportDropdownStyle: React.CSSProperties = {
    position: 'relative' as const
  };

  const dropdownContentStyle: React.CSSProperties = {
    position: 'absolute' as const,
    top: '40px',
    right: '0',
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 10,
    minWidth: '200px',
    padding: '8px'
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: 'hsl(var(--popover-foreground))',
    transition: 'background-color 0.2s ease'
  };

  return (
    <>
      <div
        style={cardStyle}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowExportDropdown(false);
        }}
      >
        <div style={contentStyle}>
          <ReportHeader title={report.title} status={report.status} />
          
          <p style={descriptionStyle}>{report.description}</p>
          
          <div style={actionButtonsStyle}>
            <button
              style={primaryButtonStyle}
              onClick={handleViewDetails}
              title="View full report details"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
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
                  e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))';
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
                      (e.target as HTMLElement).style.backgroundColor = 'hsl(var(--accent))';
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
                      (e.target as HTMLElement).style.backgroundColor = 'hsl(var(--accent))';
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
                      (e.target as HTMLElement).style.backgroundColor = 'hsl(var(--accent))';
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
                e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))';
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
