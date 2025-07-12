
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { GovernanceGroup } from './mockRiskData';

interface GovernanceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  governanceGroups: GovernanceGroup[];
}

export const GovernanceSidebar: React.FC<GovernanceSidebarProps> = ({
  isOpen,
  onClose,
  governanceGroups
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = governanceGroups.filter(group =>
    group.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGovernanceClick = (groupId: string) => {
    navigate(`/governance/${groupId}`);
    onClose();
  };

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: isOpen ? '400px' : '0',
    height: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    borderLeft: '1px solid #e2e8f0',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: isOpen ? '0 0 20px rgba(0, 0, 0, 0.3)' : 'none'
  };

  const headerStyle: React.CSSProperties = {
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#334155'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#64748b',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.2s ease'
  };

  const searchContainerStyle: React.CSSProperties = {
    padding: '0 20px 16px 20px',
    flexShrink: 0
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    color: '#334155',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '0 20px 20px 20px'
  };

  const groupCardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '12px',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.2s ease'
  };

  const groupTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px'
  };

  const groupDescriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '8px',
    lineHeight: '1.4'
  };

  const groupMetaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#94a3b8'
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => {
    const colorMap: Record<string, string> = {
      'active': '#10b981',
      'inactive': '#6b7280',
      'pending': '#f59e0b'
    };

    return {
      background: colorMap[status] || '#6b7280',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '10px',
      fontSize: '10px',
      fontWeight: '600'
    };
  };

  // Overlay to push content left when sidebar is open
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: isOpen ? '400px' : '0',
    bottom: 0,
    background: 'transparent',
    zIndex: 999,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'right 0.3s ease'
  };

  return (
    <>
      {/* Overlay to adjust main content */}
      <div style={overlayStyle} />
      
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>📋 Governance List</div>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ×
          </button>
        </div>

        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search governance groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={contentStyle}>
          {filteredGroups.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '14px',
              marginTop: '40px'
            }}>
              {searchQuery ? 'No matching governance groups found' : 'No governance groups available'}
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.id}
                style={groupCardStyle}
                onClick={() => handleGovernanceClick(group.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.cursor = 'pointer';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.cursor = 'default';
                }}
              >
                <div style={groupTitleStyle}>{group.name}</div>
                <div style={groupMetaStyle}>
                  <span>ID: {group.id}</span>
                  <div style={statusBadgeStyle(group.status)}>
                    {group.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
