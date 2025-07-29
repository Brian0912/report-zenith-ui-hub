import React, { useState } from 'react';
import { AnalysisReport } from '../../types/xray';
import { ChevronLeft, ChevronRight, Plus, Search, Star, Clock, MoreVertical, Users } from 'lucide-react';

interface XRaySidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeView: 'new-scan' | 'search-history';
  onViewChange: (view: 'new-scan' | 'search-history') => void;
  onLoadCurl: (curl: string) => void;
  onSelectReport: (report: AnalysisReport) => void;
  sharedReports: AnalysisReport[];
  starredReports: AnalysisReport[];
  recentReports: AnalysisReport[];
  onToggleStar: (reportId: string) => void;
}

export const XRaySidebar: React.FC<XRaySidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeView,
  onViewChange,
  onLoadCurl,
  onSelectReport,
  sharedReports,
  starredReports,
  recentReports,
  onToggleStar
}) => {
  const [contextMenu, setContextMenu] = useState<{
    reportId: string;
    x: number;
    y: number;
  } | null>(null);

  const handleReportClick = (report: AnalysisReport) => {
    onSelectReport(report);
  };

  const handleContextMenu = (reportId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      reportId,
      x: event.clientX,
      y: event.clientY
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const truncateCommand = (command: string, maxLength: number = 35): string => {
    return command.length > maxLength ? command.substring(0, maxLength) + '...' : command;
  };

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return '#10B981';
      case 'POST': return '#3B82F6';
      case 'PUT': return '#F59E0B';
      case 'DELETE': return '#EF4444';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '60px' : '300px',
    height: '100vh',
    backgroundColor: 'hsl(var(--card))',
    borderRight: '1px solid hsl(var(--border))',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    position: 'relative'
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '-12px',
    width: '24px',
    height: '24px',
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    color: 'hsl(var(--foreground))'
  };

  const navButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: 'hsl(var(--foreground))',
    transition: 'all 0.2s',
    borderRadius: '8px',
    margin: '2px 8px',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  };

  const activeNavButtonStyle: React.CSSProperties = {
    ...navButtonStyle,
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 16px 8px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'hsl(var(--muted-foreground))',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const reportItemStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '2px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={sidebarStyle}>
      <button style={toggleButtonStyle} onClick={onToggleCollapse}>
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Top Navigation Buttons */}
      <div style={{ padding: '20px 0 16px', borderBottom: '1px solid hsl(var(--border))' }}>
        <button
          onClick={() => onViewChange('new-scan')}
          style={{
            ...navButtonStyle,
            ...(activeView === 'new-scan' ? activeNavButtonStyle : {})
          }}
        >
          <Plus style={{ width: '16px', height: '16px' }} />
          {!isCollapsed && <span>New Scan</span>}
        </button>
        <button
          onClick={() => onViewChange('search-history')}
          style={{
            ...navButtonStyle,
            ...(activeView === 'search-history' ? activeNavButtonStyle : {})
          }}
        >
          <Search style={{ width: '16px', height: '16px' }} />
          {!isCollapsed && <span>Search History</span>}
        </button>
      </div>

      {/* Content Sections */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Shared with You */}
        <div style={{ padding: '16px 0 8px 0' }}>
          <div style={sectionHeaderStyle}>
            <Users style={{ width: '14px', height: '14px' }} />
            {!isCollapsed && <span>Shared with You</span>}
          </div>
          {!isCollapsed && (
            <div style={{ padding: '8px 0' }}>
              {sharedReports.length === 0 ? (
                <div style={{ 
                  padding: '8px 16px', 
                  color: 'hsl(var(--muted-foreground))', 
                  fontSize: '12px' 
                }}>
                  No shared items
                </div>
              ) : (
                sharedReports.map((report) => (
                  <div
                    key={report.id}
                    style={reportItemStyle}
                    onClick={() => handleReportClick(report)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: 'hsl(var(--foreground))',
                        marginBottom: '2px'
                      }}>
                        <span style={{ 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          fontSize: '10px', 
                          fontWeight: '600',
                          backgroundColor: getMethodColor(report.method),
                          color: 'white',
                          marginRight: '6px'
                        }}>
                          {report.method}
                        </span>
                        {new URL(report.url).pathname}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: 'hsl(var(--muted-foreground))',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {truncateCommand(report.curlCommand, 35)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContextMenu(report.id, e);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'hsl(var(--muted-foreground))',
                        opacity: 0.7
                      }}
                    >
                      <MoreVertical style={{ width: '12px', height: '12px' }} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Starred */}
        <div style={{ padding: '8px 0' }}>
          <div style={sectionHeaderStyle}>
            <Star style={{ width: '14px', height: '14px' }} />
            {!isCollapsed && <span>Starred</span>}
          </div>
          {!isCollapsed && (
            <div style={{ padding: '8px 0' }}>
              {starredReports.length === 0 ? (
                <div style={{ 
                  padding: '8px 16px', 
                  color: 'hsl(var(--muted-foreground))', 
                  fontSize: '12px' 
                }}>
                  No starred items
                </div>
              ) : (
                starredReports.map((report) => (
                  <div
                    key={report.id}
                    style={reportItemStyle}
                    onClick={() => handleReportClick(report)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: 'hsl(var(--foreground))',
                        marginBottom: '2px'
                      }}>
                        <span style={{ 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          fontSize: '10px', 
                          fontWeight: '600',
                          backgroundColor: getMethodColor(report.method),
                          color: 'white',
                          marginRight: '6px'
                        }}>
                          {report.method}
                        </span>
                        {new URL(report.url).pathname}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: 'hsl(var(--muted-foreground))',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {truncateCommand(report.curlCommand, 35)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContextMenu(report.id, e);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'hsl(var(--muted-foreground))',
                        opacity: 0.7
                      }}
                    >
                      <MoreVertical style={{ width: '12px', height: '12px' }} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Recent */}
        <div style={{ padding: '8px 0' }}>
          <div style={sectionHeaderStyle}>
            <Clock style={{ width: '14px', height: '14px' }} />
            {!isCollapsed && <span>Recent</span>}
          </div>
          {!isCollapsed && (
            <div style={{ padding: '8px 0' }}>
              {recentReports.length === 0 ? (
                <div style={{ 
                  padding: '8px 16px', 
                  color: 'hsl(var(--muted-foreground))', 
                  fontSize: '12px' 
                }}>
                  No recent items
                </div>
              ) : (
                recentReports.map((report) => (
                  <div
                    key={report.id}
                    style={reportItemStyle}
                    onClick={() => handleReportClick(report)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: 'hsl(var(--foreground))',
                        marginBottom: '2px'
                      }}>
                        <span style={{ 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          fontSize: '10px', 
                          fontWeight: '600',
                          backgroundColor: getMethodColor(report.method),
                          color: 'white',
                          marginRight: '6px'
                        }}>
                          {report.method}
                        </span>
                        {new URL(report.url).pathname}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: 'hsl(var(--muted-foreground))',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {truncateCommand(report.curlCommand, 35)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContextMenu(report.id, e);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'hsl(var(--muted-foreground))',
                        opacity: 0.7
                      }}
                    >
                      <MoreVertical style={{ width: '12px', height: '12px' }} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={closeContextMenu}
          />
          <div
            style={{
              position: 'fixed',
              top: contextMenu.y,
              left: contextMenu.x,
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              zIndex: 999,
              minWidth: '180px',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => {
                onToggleStar(contextMenu.reportId);
                closeContextMenu();
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'hsl(var(--foreground))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Star size={14} />
              {starredReports.find(r => r.id === contextMenu.reportId) ? 'Remove Star' : 'Add Star'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};