
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, List, ChevronDown, Clock, Users, Calendar, CheckCircle, AlertCircle, Loader } from 'lucide-react';
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
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(report.isSubscribed);
  const { downloadProgress, startDownload, cancelDownload } = useDownload();

  // Status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          badge: { bg: '#DCFCE7', color: '#166534' },
          progress: { text: 'Updated 2h ago', color: '#059669' }
        };
      case 'running':
        return {
          badge: { bg: '#DBEAFE', color: '#1D4ED8' },
          progress: { text: `${report.progress}% complete`, color: '#2563EB' }
        };
      case 'queued':
        return {
          badge: { bg: '#FEF3C7', color: '#D97706' },
          progress: { text: 'Not started', color: '#D97706' }
        };
      case 'error':
        return {
          badge: { bg: '#FEE2E2', color: '#DC2626' },
          progress: { text: 'Failed to complete', color: '#DC2626' }
        };
      default:
        return {
          badge: { bg: '#F3F4F6', color: '#374151' },
          progress: { text: 'Unknown', color: '#6B7280' }
        };
    }
  };

  // Report type configuration
  const getReportTypeConfig = (frequency: string) => {
    const typeMap: Record<string, { bg: string; color: string; label: string }> = {
      'daily': { bg: '#F3F4F6', color: '#374151', label: 'Ad Hoc' },
      'weekly': { bg: '#EDE9FE', color: '#5B21B6', label: 'Weekly' },
      'monthly': { bg: '#DBEAFE', color: '#1E40AF', label: 'Monthly' },
      'quarterly': { bg: '#D1FAE5', color: '#047857', label: 'Quarterly' },
      'bi-annual': { bg: '#D1FAE5', color: '#047857', label: 'Bi-annual' },
      'hourly': { bg: '#F3F4F6', color: '#374151', label: 'Ad Hoc' }
    };
    return typeMap[frequency.toLowerCase()] || typeMap['daily'];
  };

  const statusConfig = getStatusConfig(report.status);
  const typeConfig = getReportTypeConfig(report.schedule.frequency);

  // Card container styles
  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    height: '300px',
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
    flexDirection: 'column'
  };

  // Title section - Fixed height
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

  // Owner section - Fixed height
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

  // Description section - Flexible but controlled
  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: '400',
    color: '#475569',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '36px'
  };

  // Tags section - Single line with all tags
  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    height: '32px',
    alignItems: 'center'
  };

  const tagStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'all 0.2s ease'
  };

  // Footer section - Anchored to bottom
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

  // Version dropdown styles
  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 100,
    minWidth: '200px',
    padding: '8px 0'
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    fontSize: '12px',
    color: '#475569',
    cursor: 'pointer',
    borderBottom: '1px solid #F1F5F9'
  };

  function getAvatarColor(name: string): string {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
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

  const handleVersionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVersionDropdown(!showVersionDropdown);
  };

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSubscribed(!isSubscribed);
    onSubscribe(report.id);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setShowVersionDropdown(false);
  };

  return (
    <TooltipProvider>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleCardMouseLeave}
        onClick={() => navigate(`/tasks/${report.id}/report`)}
      >
        {/* Title Section */}
        <div style={titleSectionStyle}>
          {report.title.length > 50 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 style={titleStyle}>{report.title}</h3>
              </TooltipTrigger>
              <TooltipContent style={{
                maxWidth: '300px',
                padding: '12px',
                backgroundColor: '#374151',
                color: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                lineHeight: '1.4',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}>
                {report.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <h3 style={titleStyle}>{report.title}</h3>
          )}
          <ReportStatusBadge status={report.status} />
        </div>

        {/* Owner Section */}
        <div style={ownerSectionStyle}>
          <div style={avatarStyle}>
            {report.pointOfContact.avatar}
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#64748B'
          }}>
            {report.pointOfContact.name}
          </span>
        </div>

        {/* Description */}
        <p style={descriptionStyle}>{report.description}</p>

        {/* Tags Section - Single Line */}
        <div style={tagsContainerStyle}>
          {/* Report Type Tag */}
          <div style={{
            ...tagStyle,
            backgroundColor: typeConfig.bg,
            color: typeConfig.color
          }}>
            <Calendar size={12} />
            {typeConfig.label}
          </div>

          {/* Version Tag with Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                ...tagStyle,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={handleVersionClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E5E7EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
            >
              {report.version}
              <ChevronDown size={12} />
            </button>
            
            {showVersionDropdown && (
              <div style={dropdownStyle}>
                {report.versions.map((version, index) => (
                  <div
                    key={version.id}
                    style={{
                      ...dropdownItemStyle,
                      borderBottom: index === report.versions.length - 1 ? 'none' : '1px solid #F1F5F9'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <div style={{ fontWeight: '500', marginBottom: '2px' }}>
                      {version.version}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {version.status === 'completed' ? 
                        new Date(version.createdAt).toLocaleDateString() : 
                        version.status === 'failed' ? 'Error' : 'In Progress'
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress/Status Tag */}
          <div style={{
            ...tagStyle,
            backgroundColor: statusConfig.badge.bg,
            color: statusConfig.progress.color
          }}>
            {report.status === 'completed' && <CheckCircle size={12} />}
            {report.status === 'running' && <Loader size={12} />}
            {report.status === 'queued' && <Clock size={12} />}
            {report.status === 'error' && <AlertCircle size={12} />}
            {statusConfig.progress.text}
          </div>

          {/* Subscribers Tag */}
          <button
            style={{
              ...tagStyle,
              backgroundColor: isSubscribed ? '#DCFCE7' : '#F3F4F6',
              color: isSubscribed ? '#166534' : '#374151',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={handleSubscribeClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isSubscribed ? '#BBF7D0' : '#E5E7EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isSubscribed ? '#DCFCE7' : '#F3F4F6';
            }}
          >
            <Users size={12} />
            {report.subscriberCount} {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
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
              style={{
                ...secondaryButtonStyle,
                position: 'relative'
              }}
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
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  borderRadius: '50%',
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
