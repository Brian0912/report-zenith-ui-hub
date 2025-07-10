import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, List, MoreHorizontal } from 'lucide-react';
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
  const [showMoreActions, setShowMoreActions] = useState(false);
  const { downloadProgress, startDownload, cancelDownload } = useDownload();

  // Card container styles - optimized height and spacing
  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    height: '260px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #E5E7EB',
    boxShadow: isHovered 
      ? '0px 8px 24px rgba(0, 0, 0, 0.12)' 
      : '0px 4px 12px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.6, 1)',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  // Header section with title and status
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
    flex: 1,
    paddingRight: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  // Owner info section
  const ownerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  };

  const avatarStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: getAvatarColor(report.pointOfContact.name),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600'
  };

  const ownerNameStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
    color: '#6B7280'
  };

  // Description with truncation
  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: '400',
    color: '#374151',
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '36px'
  };

  // Metrics chips
  const metricsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '6px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  };

  const metricChipStyle: React.CSSProperties = {
    padding: '4px 8px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6B7280'
  };

  // Footer with actions - positioned at bottom
  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '8px'
  };

  const primaryButtonStyle: React.CSSProperties = {
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
  };

  const secondaryActionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: '#6B7280',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s ease'
  };

  // Last updated timestamp - positioned absolutely
  const timestampStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '12px',
    right: '16px',
    fontSize: '11px',
    color: '#9CA3AF',
    fontWeight: '400'
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

  const handleSubscribe = () => {
    onSubscribe(report.id);
  };

  const isDescriptionTruncated = report.description.length > 100;

  return (
    <TooltipProvider>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowMoreActions(false);
        }}
        onClick={() => navigate(`/tasks/${report.id}/report`)}
      >
        {/* Content Container */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div>
            <div style={headerStyle}>
              <h3 style={titleStyle}>{report.title}</h3>
              <ReportStatusBadge status={report.status} />
            </div>

            {/* Owner */}
            <div style={ownerStyle}>
              <div style={avatarStyle}>
                {report.pointOfContact.avatar}
              </div>
              <span style={ownerNameStyle}>{report.pointOfContact.name}</span>
            </div>

            {/* Description with tooltip for truncated text */}
            {isDescriptionTruncated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <p style={descriptionStyle}>{report.description}</p>
                </TooltipTrigger>
                <TooltipContent 
                  style={{
                    maxWidth: '300px',
                    padding: '12px',
                    backgroundColor: '#1F2937',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}
                >
                  {report.description}
                </TooltipContent>
              </Tooltip>
            ) : (
              <p style={descriptionStyle}>{report.description}</p>
            )}

            {/* Key Metrics */}
            <div style={metricsStyle}>
              {getKeyMetrics().map((metric, index) => (
                <span key={index} style={metricChipStyle}>{metric}</span>
              ))}
            </div>
          </div>

          {/* Footer */}
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
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={12} />
                Export
              </button>

              <button
                style={secondaryButtonStyle}
                onClick={handleViewLogs}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <List size={12} />
                Logs
                {/* Alert badge for logs */}
                <div style={{ position: 'relative' }}>
                  {report.status === 'error' && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      backgroundColor: '#EF4444',
                      color: 'white',
                      borderRadius: '10px',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '600',
                      boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                    }}>
                      !
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Last updated timestamp */}
        <div style={timestampStyle}>
          Updated 2h ago
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
