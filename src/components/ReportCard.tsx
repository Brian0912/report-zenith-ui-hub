
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
      <style>{`
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
    height: '280px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    border: `1px solid ${isHovered ? '#D1D5DB' : '#E5E7EB'}`,
    boxShadow: isHovered 
      ? '0px 8px 25px rgba(0, 0, 0, 0.12)' 
      : '0px 2px 8px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
        {/* Title Section - Fixed Height */}
        <div style={{
          height: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '12px'
        }}>
          <Tooltip 
            content={report.title} 
            show={isTitleTruncated(report.title)}
          >
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1E293B',
              margin: 0,
              lineHeight: '1.3',
              flex: 1,
              paddingRight: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              cursor: 'help'
            }}>
              {report.title}
            </h3>
          </Tooltip>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}>
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        {/* Owner Section - Fixed Height */}
        <div style={{
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div style={{ position: 'relative', marginRight: '8px' }}>
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
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#475569',
            flex: 1
          }}>
            {report.pointOfContact.name}
          </div>
        </div>

        {/* Content Area - Flexible */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <Tooltip 
            content={report.description} 
            show={isDescriptionTruncated(report.description)}
          >
            <p style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#475569',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {report.description}
            </p>
          </Tooltip>
        </div>

        {/* Tags Section - Single Line */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          flexWrap: 'nowrap',
          overflowX: 'auto'
        }}>
          {/* Report Type Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: typeConfig.bg,
            color: typeConfig.color,
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <Calendar size={12} />
            {typeConfig.label}
          </div>

          {/* Version Dropdown Tag */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: '#F3F4F6',
                color: '#64748B',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onClick={handleVersionClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E2E8F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
            >
              {report.version}
              <ChevronDown size={12} style={{
                transform: showVersionDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </button>

            {/* Version History Dropdown */}
            {showVersionDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                minWidth: '200px',
                maxHeight: '300px',
                overflowY: 'auto'
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

          {/* Progress/Status Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: statusConfig.badge.bg,
            color: statusConfig.badge.color,
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            {statusConfig.progress.text}
          </div>

          {/* Subscribers Tag */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: isSubscribed ? '#DCFCE7' : '#F3F4F6',
              color: isSubscribed ? '#166534' : '#64748B',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
            onClick={handleSubscribeClick}
            onMouseEnter={(e) => {
              if (!isSubscribed) {
                e.currentTarget.style.backgroundColor = '#E2E8F0';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isSubscribed ? '#DCFCE7' : '#F3F4F6';
            }}
          >
            <Users size={12} />
            {report.subscriberCount}
            <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
          </button>
        </div>

        {/* Footer Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid #F1F5F9'
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
              transition: 'all 0.2s ease'
            }}
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
            <Eye size={16} />
            View Report
          </button>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              style={{
                backgroundColor: 'transparent',
                color: '#64748B',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
              onClick={handleExportClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={14} />
              Export
            </button>

            <button 
              style={{
                backgroundColor: 'transparent',
                color: '#64748B',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
              onClick={handleViewLogs}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
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
                  border: '2px solid white'
                }}>
                  !
                </div>
              )}
            </button>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
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
