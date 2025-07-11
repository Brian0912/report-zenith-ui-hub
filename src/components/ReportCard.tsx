
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, List, ChevronDown, Clock, Users, Calendar, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';
import { ReportStatusBadge } from './ReportStatusBadge';
import { DownloadProgressModal } from './DownloadProgressModal';
import { useDownload } from '../hooks/useDownload';

const Tooltip = ({ children, content, show }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!show) return children;

  return (
    <div 
      style={{ position: 'relative', display: 'inherit' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '0',
          backgroundColor: '#1F2937',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          lineHeight: '18px',
          maxWidth: '300px',
          wordWrap: 'break-word',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          marginBottom: '8px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {content}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '16px',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #1F2937'
          }} />
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

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
  const [focusedElement, setFocusedElement] = useState(null);
  const { downloadProgress, startDownload, cancelDownload } = useDownload();

  // Status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          badge: { bg: '#DCFCE7', color: '#166534', icon: CheckCircle },
          progress: { text: 'Updated 2h ago', color: '#059669' }
        };
      case 'running':
        return {
          badge: { bg: '#DBEAFE', color: '#1D4ED8', icon: Loader },
          progress: { text: `${report.progress}% complete`, color: '#2563EB' }
        };
      case 'queued':
        return {
          badge: { bg: '#FEF3C7', color: '#D97706', icon: Clock },
          progress: { text: 'Not started', color: '#D97706' }
        };
      case 'error':
        return {
          badge: { bg: '#FEE2E2', color: '#DC2626', icon: AlertCircle },
          progress: { text: 'Failed to complete', color: '#DC2626' }
        };
      default:
        return {
          badge: { bg: '#F3F4F6', color: '#374151', icon: Clock },
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
  const StatusIcon = statusConfig.badge.icon;

  function getAvatarColor(name: string): string {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }

  const isTitleTruncated = (text: string): boolean => text && text.length > 50;
  const isDescriptionTruncated = (text: string): boolean => text && text.length > 120;

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

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Card container styles
  const cardStyle: React.CSSProperties = {
    width: '420px',
    minHeight: '260px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    border: `1px solid ${isHovered ? '#D1D5DB' : '#E5E7EB'}`,
    boxShadow: isHovered 
      ? '0px 8px 25px rgba(0, 0, 0, 0.12)' 
      : '0px 2px 8px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    outline: focusedElement === 'card' ? '2px solid #4F46E5' : 'none',
    outlineOffset: '2px'
  };

  return (
    <div>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleCardMouseLeave}
        onClick={() => navigate(`/tasks/${report.id}/report`)}
        onKeyDown={(e) => handleKeyDown(e, () => navigate(`/tasks/${report.id}/report`))}
        tabIndex={0}
        role="button"
        aria-label={`View ${report.title} report`}
        onFocus={() => setFocusedElement('card')}
        onBlur={() => setFocusedElement(null)}
      >
        {/* Content Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header: Title + Status + Subscription */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <Tooltip 
              content={report.title} 
              show={isTitleTruncated(report.title)}
            >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                margin: 0,
                lineHeight: '24px',
                height: '48px',
                flex: 1,
                paddingRight: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordWrap: 'break-word',
                hyphens: 'auto'
              }}>
                {report.title}
              </h3>
            </Tooltip>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {/* Subscription Button */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: isSubscribed ? '#F0F9FF' : 'transparent',
                  color: isSubscribed ? '#0369A1' : '#6B7280',
                  border: `1px solid ${isSubscribed ? '#0369A1' : '#D1D5DB'}`,
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '80px',
                  justifyContent: 'center',
                  outline: focusedElement === 'subscribe' ? '2px solid #4F46E5' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={handleSubscribeClick}
                onKeyDown={(e) => handleKeyDown(e, () => setIsSubscribed(!isSubscribed))}
                onFocus={() => setFocusedElement('subscribe')}
                onBlur={() => setFocusedElement(null)}
                onMouseEnter={(e) => {
                  if (!isSubscribed) {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#9CA3AF';
                  } else {
                    e.currentTarget.style.backgroundColor = '#E0F2FE';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isSubscribed ? '#F0F9FF' : 'transparent';
                  e.currentTarget.style.borderColor = isSubscribed ? '#0369A1' : '#D1D5DB';
                }}
                aria-label={isSubscribed ? 'Unfollow report' : 'Follow report'}
              >
                <span>{report.subscriberCount}</span>
                <span>{isSubscribed ? 'Following' : 'Follow'}</span>
              </button>

              {/* Status Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: statusConfig.badge.bg,
                color: statusConfig.badge.color,
                padding: '6px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
                animation: report.status === 'running' ? 'pulse 2s infinite' : 'none'
              }}>
                <StatusIcon size={10} />
                {report.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Meta Information Row */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '12px',
            minHeight: '28px'
          }}>
            {/* Owner Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: getAvatarColor(report.pointOfContact.name),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {report.pointOfContact.avatar}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#374151', 
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {report.pointOfContact.name}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Calendar size={10} />
                  {typeConfig.label}
                </div>
              </div>
            </div>

            {/* Version Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  outline: focusedElement === 'version' ? '2px solid #4F46E5' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={handleVersionClick}
                onKeyDown={(e) => handleKeyDown(e, () => setShowVersionDropdown(!showVersionDropdown))}
                onFocus={() => setFocusedElement('version')}
                onBlur={() => setFocusedElement(null)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="View version history"
                aria-expanded={showVersionDropdown}
              >
                {report.version}
                <ChevronDown size={10} style={{
                  transform: showVersionDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} />
              </button>

              {/* Version History Dropdown */}
              {showVersionDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  minWidth: '200px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  animation: 'slideIn 0.2s ease-out'
                }}>
                  {report.versions.map((version, index) => (
                    <div
                      key={version.id}
                      style={{
                        padding: '10px 12px',
                        borderBottom: index === report.versions.length - 1 ? 'none' : '1px solid #F1F5F9',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <div style={{ fontWeight: '500', marginBottom: '2px', fontSize: '12px', color: '#374151' }}>
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
          </div>

          {/* Description */}
          <Tooltip 
            content={report.description} 
            show={isDescriptionTruncated(report.description)}
          >
            <p style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: '#374151',
              margin: '0 0 12px 0',
              height: '40px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {report.description}
            </p>
          </Tooltip>

          {/* Progress Status */}
          <div style={{
            fontSize: '12px',
            color: statusConfig.progress.color,
            fontWeight: '500',
            marginBottom: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {statusConfig.progress.text}
          </div>
        </div>

        {/* Enhanced Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid #F3F4F6'
        }}>
          <button 
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              outline: focusedElement === 'view' ? '2px solid #7C3AED' : 'none',
              outlineOffset: '2px'
            }}
            onClick={handleViewDetails}
            onFocus={() => setFocusedElement('view')}
            onBlur={() => setFocusedElement(null)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4338CA';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4F46E5';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            aria-label="View full report"
          >
            <Eye size={16} />
            View Report
          </button>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              style={{
                backgroundColor: 'transparent',
                color: '#6B7280',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
                outline: focusedElement === 'export' ? '2px solid #4F46E5' : 'none',
                outlineOffset: '2px'
              }}
              onClick={handleExportClick}
              onFocus={() => setFocusedElement('export')}
              onBlur={() => setFocusedElement(null)}
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
              aria-label="Export report data"
            >
              <Download size={14} />
              Export
            </button>

            <button 
              style={{
                backgroundColor: 'transparent',
                color: '#6B7280',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                transition: 'all 0.2s ease',
                outline: focusedElement === 'logs' ? '2px solid #4F46E5' : 'none',
                outlineOffset: '2px'
              }}
              onClick={handleViewLogs}
              onFocus={() => setFocusedElement('logs')}
              onBlur={() => setFocusedElement(null)}
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
              aria-label="View execution logs"
            >
              <List size={14} />
              Logs
              {report.status === 'error' && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  borderRadius: '10px',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '700',
                  border: '2px solid white',
                  animation: 'bounce 1s infinite'
                }}>
                  !
                </div>
              )}
            </button>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-3px); }
            70% { transform: translateY(-2px); }
            90% { transform: translateY(-1px); }
          }
        `}</style>
      </div>

      <DownloadProgressModal
        visible={downloadProgress.isDownloading || downloadProgress.progress === 100}
        progress={downloadProgress}
        onCancel={cancelDownload}
      />
    </div>
  );
};
