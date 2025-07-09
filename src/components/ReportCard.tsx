import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, List, MoreHorizontal } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
import { ReportStatusBadge } from './ReportStatusBadge';
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
  const [showMoreActions, setShowMoreActions] = useState(false);
  const { downloadProgress, startDownload, cancelDownload } = useDownload();

  // Card container styles with increased height and flexbox
  const cardStyle: React.CSSProperties = {
    width: '400px',
    height: '280px', // Increased from 200px to 280px
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #E5E7EB',
    boxShadow: isHovered 
      ? '0px 4px 16px rgba(0, 0, 0, 0.12)' 
      : '0px 2px 8px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between' // This ensures footer stays at bottom
  };

  // Content container to allow for proper flex layout
  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
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
    paddingRight: '16px'
  };

  // Owner info section
  const ownerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
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
    fontSize: '12px',
    fontWeight: '600'
  };

  const ownerNameStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '400',
    color: '#6B7280'
  };

  // Description with more space due to increased height
  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '400',
    color: '#374151',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Increased from 2 to 3 lines
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1 // This takes available space
  };

  // Metrics chips
  const metricsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  };

  const metricChipStyle: React.CSSProperties = {
    padding: '4px 8px',
    backgroundColor: '#F3F4F6',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6B7280'
  };

  // Footer with actions - now properly positioned at bottom
  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto' // This pushes footer to bottom
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
    transition: 'all 0.2s ease'
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
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s ease'
  };

  const moreButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  };

  // Last updated timestamp
  const timestampStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '8px',
    right: '12px',
    fontSize: '12px',
    color: '#9CA3AF'
  };

  // Alert badge if applicable
  const alertBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-6px',
    right: '8px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '10px',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600'
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

  return (
    <>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowMoreActions(false);
        }}
        onClick={() => navigate(`/tasks/${report.id}/report`)}
      >
        <div style={contentStyle}>
          {/* Header */}
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

          {/* Description */}
          <p style={descriptionStyle}>{report.description}</p>

          {/* Key Metrics */}
          <div style={metricsStyle}>
            {getKeyMetrics().map((metric, index) => (
              <span key={index} style={metricChipStyle}>{metric}</span>
            ))}
          </div>
        </div>

        {/* Footer - now properly at bottom */}
        <div style={footerStyle}>
          <button
            style={primaryButtonStyle}
            onClick={handleViewDetails}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4338CA';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4F46E5';
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#E5E7EB';
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <List size={12} />
              Logs
              {/* Alert badge for logs */}
              <div style={{ position: 'relative' }}>
                {report.status === 'error' && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    borderRadius: '8px',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    !
                  </div>
                )}
              </div>
            </button>
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
    </>
  );
};
