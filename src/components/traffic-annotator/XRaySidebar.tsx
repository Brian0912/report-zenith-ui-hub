import React from 'react';
import { Search, Plus, MoreVertical, Star } from 'lucide-react';

interface XRayItem {
  id: string;
  title: string;
  method: string;
  url: string;
  timestamp: Date;
  isStarred: boolean;
}

interface XRaySidebarProps {
  onNewScan: () => void;
  onSearchHistory: () => void;
  onItemClick: (item: XRayItem) => void;
  onToggleStar: (itemId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Mock data
const mockSharedItems: XRayItem[] = [
  {
    id: 'shared-1',
    title: 'API Auth Test',
    method: 'POST',
    url: '/api/auth/login',
    timestamp: new Date('2024-01-15T10:30:00'),
    isStarred: false
  },
  {
    id: 'shared-2',
    title: 'User Profile API',
    method: 'GET',
    url: '/api/user/profile',
    timestamp: new Date('2024-01-14T15:45:00'),
    isStarred: true
  }
];

const mockRecentItems: XRayItem[] = [
  {
    id: 'recent-1',
    title: 'Payment Gateway',
    method: 'POST',
    url: '/api/payments/process',
    timestamp: new Date('2024-01-16T09:15:00'),
    isStarred: false
  },
  {
    id: 'recent-2',
    title: 'File Upload API',
    method: 'POST',
    url: '/api/upload/file',
    timestamp: new Date('2024-01-15T14:20:00'),
    isStarred: true
  },
  {
    id: 'recent-3',
    title: 'Search Results',
    method: 'GET',
    url: '/api/search?q=test',
    timestamp: new Date('2024-01-15T11:30:00'),
    isStarred: false
  }
];

export const XRaySidebar: React.FC<XRaySidebarProps> = ({
  onNewScan,
  onSearchHistory,
  onItemClick,
  onToggleStar,
  isCollapsed,
  onToggleCollapse
}) => {
  const starredItems = [...mockSharedItems, ...mockRecentItems].filter(item => item.isStarred);

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '60px' : '300px',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    transition: 'width 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 10,
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #e2e8f0'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: 'none',
    backgroundColor: '#f8fafc',
    color: '#334155',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    transition: 'background-color 0.2s ease'
  };

  const sectionStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #f1f5f9'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  const itemStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '4px',
    backgroundColor: '#ffffff',
    border: '1px solid #f1f5f9',
    transition: 'all 0.2s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const itemContentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden'
  };

  const itemTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: '4px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const itemSubtitleStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#64748b',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const configButtonStyle: React.CSSProperties = {
    padding: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    transition: 'all 0.2s ease'
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '8px',
    border: 'none',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    cursor: 'pointer',
    zIndex: 20
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const renderItem = (item: XRayItem) => (
    <div
      key={item.id}
      style={itemStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8fafc';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.borderColor = '#f1f5f9';
      }}
    >
      <div style={itemContentStyle} onClick={() => onItemClick(item)}>
        <div style={itemTitleStyle}>{item.title}</div>
        <div style={itemSubtitleStyle}>
          {item.method} {item.url} • {formatTime(item.timestamp)}
        </div>
      </div>
      {!isCollapsed && (
        <button
          style={configButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(item.id);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.opacity = '0.6';
          }}
        >
          {item.isStarred ? (
            <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
          ) : (
            <MoreVertical size={16} />
          )}
        </button>
      )}
    </div>
  );

  return (
    <>
      <button
        style={toggleButtonStyle}
        onClick={onToggleCollapse}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e2e8f0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f8fafc';
        }}
      >
        ☰
      </button>
      
      <div style={sidebarStyle}>
        {!isCollapsed && (
          <>
            <div style={headerStyle}>
              <button
                style={buttonStyle}
                onClick={onNewScan}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
              >
                <Plus size={16} />
                New Scan
              </button>
              <button
                style={buttonStyle}
                onClick={onSearchHistory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
              >
                <Search size={16} />
                Search History
              </button>
            </div>

            <div style={sectionStyle}>
              <div style={sectionTitleStyle}>Shared with You</div>
              {mockSharedItems.map(renderItem)}
            </div>

            <div style={sectionStyle}>
              <div style={sectionTitleStyle}>Starred</div>
              {starredItems.length > 0 ? (
                starredItems.map(renderItem)
              ) : (
                <div style={{ ...itemSubtitleStyle, textAlign: 'center', padding: '12px' }}>
                  No starred items
                </div>
              )}
            </div>

            <div style={sectionStyle}>
              <div style={sectionTitleStyle}>Recent</div>
              {mockRecentItems.map(renderItem)}
            </div>
          </>
        )}
      </div>
    </>
  );
};