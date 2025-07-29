import React, { useState } from 'react';
import { Scan, Search, Folder, Star, Clock, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

interface CurlItem {
  id: string;
  command: string;
  timestamp: string;
  folderPath?: string;
  isStarred: boolean;
}

interface XRaySidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeView: 'new-scan' | 'search-history' | 'folders';
  onViewChange: (view: 'new-scan' | 'search-history' | 'folders') => void;
  onLoadCurl: (curl: string) => void;
}

export const XRaySidebar: React.FC<XRaySidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeView,
  onViewChange,
  onLoadCurl
}) => {
  const [starredCurls] = useState<CurlItem[]>([
    {
      id: '1',
      command: 'curl -X POST https://api.example.com/login',
      timestamp: '2024-01-15 14:30',
      isStarred: true
    },
    {
      id: '2',
      command: 'curl -X GET https://api.example.com/users',
      timestamp: '2024-01-14 09:15',
      isStarred: true
    }
  ]);

  const [recentCurls] = useState<CurlItem[]>([
    {
      id: '3',
      command: 'curl -X POST https://api.example.com/data',
      timestamp: '2024-01-15 16:45',
      isStarred: false
    },
    {
      id: '4',
      command: 'curl -X GET https://api.example.com/status',
      timestamp: '2024-01-15 16:30',
      isStarred: false
    },
    {
      id: '5',
      command: 'curl -X PUT https://api.example.com/settings',
      timestamp: '2024-01-15 15:20',
      isStarred: false
    }
  ]);

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

  const truncateCommand = (command: string, maxLength: number = 30): string => {
    return command.length > maxLength ? command.substring(0, maxLength) + '...' : command;
  };

  const handleCurlItemClick = (command: string) => {
    onLoadCurl(command);
    if (activeView !== 'new-scan') {
      onViewChange('new-scan');
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
          {/* Starred cURLs */}
          <div style={{ marginTop: '16px' }}>
            <div style={sectionHeaderStyle}>
              <Star size={12} style={{ display: 'inline', marginRight: '6px' }} />
              Starred cURLs
            </div>
            {starredCurls.map((item) => (
              <div
                key={item.id}
                style={curlItemStyle}
                onClick={() => handleCurlItemClick(item.command)}
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
                  <div style={curlCommandStyle}>{truncateCommand(item.command)}</div>
                  <div style={timestampStyle}>{item.timestamp}</div>
                </div>
                <button
                  data-config-btn
                  style={configButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle config menu
                  }}
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

          {/* Recent cURLs */}
          <div style={{ marginTop: '24px' }}>
            <div style={sectionHeaderStyle}>
              <Clock size={12} style={{ display: 'inline', marginRight: '6px' }} />
              Recent cURLs
            </div>
            {recentCurls.map((item) => (
              <div
                key={item.id}
                style={curlItemStyle}
                onClick={() => handleCurlItemClick(item.command)}
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
                  <div style={curlCommandStyle}>{truncateCommand(item.command)}</div>
                  <div style={timestampStyle}>{item.timestamp}</div>
                </div>
                <button
                  data-config-btn
                  style={configButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle config menu
                  }}
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
    </div>
  );
};