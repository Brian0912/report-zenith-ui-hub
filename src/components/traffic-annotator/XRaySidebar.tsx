import React, { useState } from 'react';
import { Menu, X, Scan, History, Star, Share, Clock, MoreVertical } from 'lucide-react';

interface AnalysisItem {
  id: string;
  name: string;
  curlCommand: string;
  timestamp: string;
  isStarred: boolean;
  isShared?: boolean;
  sharedBy?: string;
}

interface XRaySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewScan: () => void;
  onSearchHistory: () => void;
  onViewAnalysis: (item: AnalysisItem) => void;
  onToggleStar: (itemId: string) => void;
  sharedItems: AnalysisItem[];
  starredItems: AnalysisItem[];
  recentItems: AnalysisItem[];
}

export const XRaySidebar: React.FC<XRaySidebarProps> = ({
  isOpen,
  onToggle,
  onNewScan,
  onSearchHistory,
  onViewAnalysis,
  onToggleStar,
  sharedItems,
  starredItems,
  recentItems
}) => {
  const [expandedSections, setExpandedSections] = useState({
    shared: true,
    starred: true,
    recent: true
  });

  const toggleSection = (section: 'shared' | 'starred' | 'recent') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const truncateCommand = (command: string, maxLength: number = 30) => {
    return command.length > maxLength ? `${command.substring(0, maxLength)}...` : command;
  };

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: isOpen ? '320px' : '60px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    transition: 'width 0.3s ease-in-out',
    zIndex: 1000,
    overflow: 'hidden',
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const toggleButtonStyle: React.CSSProperties = {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s'
  };

  const navButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '4px 0',
    transition: 'all 0.2s'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  };

  const itemStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    margin: '2px 8px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s'
  };

  const itemContentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden'
  };

  const itemTitleStyle: React.CSSProperties = {
    fontWeight: '500',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const itemSubtitleStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const configButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#9ca3af',
    opacity: 0,
    transition: 'all 0.2s'
  };

  const renderItemList = (items: AnalysisItem[], sectionKey: 'shared' | 'starred' | 'recent') => {
    if (!expandedSections[sectionKey] || !isOpen) return null;

    return (
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={itemStyle}
            onClick={() => onViewAnalysis(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              const configBtn = e.currentTarget.querySelector('.config-btn') as HTMLElement;
              if (configBtn) configBtn.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              const configBtn = e.currentTarget.querySelector('.config-btn') as HTMLElement;
              if (configBtn) configBtn.style.opacity = '0';
            }}
          >
            <div style={itemContentStyle}>
              <div style={itemTitleStyle}>
                {item.name}
                {item.sharedBy && (
                  <span style={{ color: '#10b981', fontSize: '10px', marginLeft: '4px' }}>
                    by {item.sharedBy}
                  </span>
                )}
              </div>
              <div style={itemSubtitleStyle}>
                {truncateCommand(item.curlCommand)} • {formatTimestamp(item.timestamp)}
              </div>
            </div>
            
            <button
              className="config-btn"
              style={configButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(item.id);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              <Star 
                size={14} 
                fill={item.isStarred ? '#fbbf24' : 'none'}
                color={item.isStarred ? '#fbbf24' : '#9ca3af'}
              />
            </button>
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <button
            style={toggleButtonStyle}
            onClick={onToggle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
          X-Ray Navigator
        </h2>
        <button
          style={toggleButtonStyle}
          onClick={onToggle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Buttons */}
      <div style={{ padding: '16px 8px', borderBottom: '1px solid #e5e7eb' }}>
        <button
          style={navButtonStyle}
          onClick={onNewScan}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Scan size={18} />
          New Scan
        </button>
        
        <button
          style={navButtonStyle}
          onClick={onSearchHistory}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <History size={18} />
          Search History
        </button>
      </div>

      {/* Content Sections */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {/* Shared with You */}
        <div>
          <div
            style={sectionHeaderStyle}
            onClick={() => toggleSection('shared')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Share size={14} />
              Shared with You ({sharedItems.length})
            </div>
            <span style={{ transform: expandedSections.shared ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▶
            </span>
          </div>
          {renderItemList(sharedItems, 'shared')}
        </div>

        {/* Starred */}
        <div style={{ marginTop: '16px' }}>
          <div
            style={sectionHeaderStyle}
            onClick={() => toggleSection('starred')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={14} />
              Starred ({starredItems.length})
            </div>
            <span style={{ transform: expandedSections.starred ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▶
            </span>
          </div>
          {renderItemList(starredItems, 'starred')}
        </div>

        {/* Recent */}
        <div style={{ marginTop: '16px' }}>
          <div
            style={sectionHeaderStyle}
            onClick={() => toggleSection('recent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} />
              Recent ({recentItems.length})
            </div>
            <span style={{ transform: expandedSections.recent ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▶
            </span>
          </div>
          {renderItemList(recentItems, 'recent')}
        </div>
      </div>
    </div>
  );
};