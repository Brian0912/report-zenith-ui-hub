
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, List } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
import { ReportStatusBadge } from './ReportStatusBadge';
import { DownloadProgressModal } from './DownloadProgressModal';
import { useDownload } from '../hooks/useDownload';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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
  const { downloadProgress, startDownload, cancelDownload } = useDownload();

  // Card container - fixed height with flex layout
  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    height: '280px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #E2E8F0',
    boxShadow: isHovered 
      ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  // Fixed title section - 48px height
  const titleSectionStyle: React.CSSProperties = {
    height: '48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: '1.3',
    margin: 0,
    flex: 1,
    paddingRight: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    cursor: 'help'
  };

  // Fixed owner section - 32px height
  const ownerSectionStyle: React.CSSProperties = {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  };

  const avatarStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: getAvatarColor(report.pointOfContact.name),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '11px',
    fontWeight: '600',
    flexShrink: 0
  };

  const ownerNameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748B'
  };

  // Flexible content area
  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    marginBottom: '16px',
    minHeight: '60px'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '400',
    color: '#475569',
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '36px'
  };

  // Fixed metrics section - 32px height
  const metricsStyle: React.CSSProperties = {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  };

  const metricChipStyle: React.CSSProperties = {
    padding: '4px 8px',
    backgroundColor: '#F1F5F9',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#64748B',
    whiteSpace: 'nowrap'
  };

  // Footer section - anchored to bottom
  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    height: '44px'
  };

  const primaryButtonStyle: React.CSSProperties = {
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(79, 70, 229, 0.2)',
    height: '36px'
  };

  const secondaryActionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: '#64748B',
    border: '1px solid #CBD5E1',
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s ease',
    height: '32px'
  };

  // Tooltip styles
  const tooltipStyle: React.CSSProperties = {
    maxWidth: '300px',
    padding: '12px',
    backgroundColor: '#374151',
    color: 'white',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.4',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  };

  function getAvatarColor(name: string): string {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }

  function getCompletionPercentage(): string {
    if (report.status === 'completed') return '100%';
    if (report.status === 'running') return `${report.progress}%`;
    if (report.status === 'queued') return '0%';
    return 'Error';
  }

  function getKeyMetrics() {
    return [
      `v${report.version}`,
      getCompletionPercentage(),
      `${report.subscriberCount} subscribers`
    ];
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/tasks/${report.id}/report`);
  };

  const handleExportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startDownload(`${report.title} - Complete Package`, report.id);
  };

  const handleViewLogs = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewLogs(report.id);
  };

  const isContentTruncated = report.title.length > 50 || report.description.length > 100;

  return (
    <TooltipProvider>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/tasks/${report.id}/report`)}
      >
        {/* Title Section - Fixed Height */}
        <div style={titleSectionStyle}>
          {report.title.length > 50 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 style={titleStyle}>{report.title}</h3>
              </TooltipTrigger>
              <TooltipContent style={tooltipStyle}>
                {report.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <h3 style={titleStyle}>{report.title}</h3>
          )}
          <ReportStatusBadge status={report.status} />
        </div>

        {/* Owner Section - Fixed Height */}
        <div style={ownerSectionStyle}>
          <div style={avatarStyle}>
            {report.pointOfContact.avatar}
          </div>
          <span style={ownerNameStyle}>{report.pointOfContact.name}</span>
        </div>

        {/* Content Area - Flexible */}
        <div style={contentAreaStyle}>
          <p style={descriptionStyle}>{report.description}</p>
          
          {/* Key Metrics - Fixed Height */}
          <div style={metricsStyle}>
            {getKeyMetrics().map((metric, index) => (
              <span key={index} style={metricChipStyle}>{metric}</span>
            ))}
          </div>
        </div>

        {/* Footer - Fixed Position */}
        <div style={footerStyle}>
          <button
            style={primaryButtonStyle}
            onClick={handleViewDetails}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4338CA';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4F46E5';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Eye size={14} />
            View Report
          </button>

          <div style={secondaryActionsStyle}>
            <button
              style={secondaryButtonStyle}
              onClick={handleExportClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#94A3B8';
                e.currentTarget.style.color = '#475569';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              <Download size={12} />
              Export
            </button>

            <button
              style={secondaryButtonStyle}
              onClick={handleViewLogs}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#94A3B8';
                e.currentTarget.style.color = '#475569';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              <List size={12} />
              Logs
              {report.status === 'error' && (
                <div style={{
                  position: 'relative',
                  marginLeft: '4px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    borderRadius: '8px',
                    width: '14px',
                    height: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: '600'
                  }}>
                    !
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <DownloadProgressModal
        visible={downloadProgress.isDownloading || downloadProgress.progress === 100}
        progress={downloadProgress}
        onCancel={cancelDownload}
      />
    </TooltipProvider>
  );
};
