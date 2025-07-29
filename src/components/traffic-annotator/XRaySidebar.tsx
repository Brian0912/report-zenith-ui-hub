import React, { useState } from 'react';
import { Scan, Search, Folder, Star, Clock, MoreVertical, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { AnalysisReport } from '../../types/xray';

interface XRaySidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeView: 'new-scan' | 'search-history' | 'folders';
  onViewChange: (view: 'new-scan' | 'search-history' | 'folders') => void;
  onLoadCurl: (curl: string) => void;
  onSelectReport: (report: AnalysisReport) => void;
  starredReports: AnalysisReport[];
  recentReports: AnalysisReport[];
  onToggleStar: (reportId: string) => void;
  onShowInFolder: (reportId: string) => void;
}

export const XRaySidebar: React.FC<XRaySidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeView,
  onViewChange,
  onLoadCurl,
  onSelectReport,
  starredReports,
  recentReports,
  onToggleStar,
  onShowInFolder
}) => {
  const [contextMenu, setContextMenu] = useState<{ reportId: string; x: number; y: number } | null>(null);

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
    padding: '16px 16px 8px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'hsl(var(--muted-foreground))',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const curlItemStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '2px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px'
  };

  const curlCommandStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'hsl(var(--muted-foreground))',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'monospace'
  };

  const timestampStyle: React.CSSProperties = {
    fontSize: '10px',
    color: 'hsl(var(--muted-foreground))',
    opacity: 0.7
  };

  const configButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'hsl(var(--muted-foreground))',
    opacity: 0,
    transition: 'all 0.2s'
  };


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

  return (
    <div style={sidebarStyle}>
      <button style={toggleButtonStyle} onClick={onToggleCollapse}>
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Top Navigation */}
      <div style={{ padding: '20px 0 16px', borderBottom: '1px solid hsl(var(--border))' }}>
        <button
          style={activeView === 'new-scan' ? activeNavButtonStyle : navButtonStyle}
          onClick={() => onViewChange('new-scan')}
          title="New Scan"
        >
          <Scan size={18} />
          {!isCollapsed && <span>New Scan</span>}
        </button>
        
        <button
          style={activeView === 'search-history' ? activeNavButtonStyle : navButtonStyle}
          onClick={() => onViewChange('search-history')}
          title="Search History"
        >
          <Search size={18} />
          {!isCollapsed && <span>Search History</span>}
        </button>
        
        <button
          style={activeView === 'folders' ? activeNavButtonStyle : navButtonStyle}
          onClick={() => onViewChange('folders')}
          title="Folders"
        >
          <Folder size={18} />
          {!isCollapsed && <span>Folders</span>}
        </button>
      </div>

      {/* Bottom Sections */}
      {!isCollapsed && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* Starred Analysis Reports */}
          <div style={{ marginTop: '16px' }}>
            <div style={sectionHeaderStyle}>
              <Star size={12} style={{ display: 'inline', marginRight: '6px' }} />
              Starred Reports
            </div>
            {starredReports.map((report) => (
              <div
                key={report.id}
                style={curlItemStyle}
                onClick={() => handleReportClick(report)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                  const configBtn = e.currentTarget.querySelector('[data-config-btn]') as HTMLElement;
                  if (configBtn) configBtn.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  const configBtn = e.currentTarget.querySelector('[data-config-btn]') as HTMLElement;
                  if (configBtn) configBtn.style.opacity = '0';
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{
                      backgroundColor: getMethodColor(report.method),
                      color: '#ffffff',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      {report.method}
                    </span>
                    <div style={{ ...curlCommandStyle, margin: 0, padding: 0, backgroundColor: 'transparent' }}>
                      {truncateCommand(report.curlCommand)}
                    </div>
                  </div>
                  <div style={timestampStyle}>{report.timestamp}</div>
                </div>
                <button
                  data-config-btn
                  style={configButtonStyle}
                  onClick={(e) => handleContextMenu(report.id, e)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Recent Analysis Reports */}
          <div style={{ marginTop: '24px' }}>
            <div style={sectionHeaderStyle}>
              <Clock size={12} style={{ display: 'inline', marginRight: '6px' }} />
              Recent Reports
            </div>
            {recentReports.slice(0, 5).map((report) => (
              <div
                key={report.id}
                style={curlItemStyle}
                onClick={() => handleReportClick(report)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                  const configBtn = e.currentTarget.querySelector('[data-config-btn]') as HTMLElement;
                  if (configBtn) configBtn.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  const configBtn = e.currentTarget.querySelector('[data-config-btn]') as HTMLElement;
                  if (configBtn) configBtn.style.opacity = '0';
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{
                      backgroundColor: getMethodColor(report.method),
                      color: '#ffffff',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      {report.method}
                    </span>
                    <div style={{ ...curlCommandStyle, margin: 0, padding: 0, backgroundColor: 'transparent' }}>
                      {truncateCommand(report.curlCommand)}
                    </div>
                  </div>
                  <div style={timestampStyle}>{report.timestamp}</div>
                </div>
                <button
                  data-config-btn
                  style={configButtonStyle}
                  onClick={(e) => handleContextMenu(report.id, e)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
              {starredReports.find(r => r.id === contextMenu.reportId) ? 'Remove from Star' : 'Add to Star'}
            </button>
            <button
              onClick={() => {
                onShowInFolder(contextMenu.reportId);
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
              <FolderOpen size={14} />
              Show in Folder
            </button>
          </div>
        </>
      )}
    </div>
  );
};