
import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = governanceGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: isOpen ? 0 : '-400px',
    width: '400px',
    height: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    borderLeft: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    boxShadow: theme === 'dark' 
      ? '-4px 0 20px rgba(0, 0, 0, 0.3)'
      : '-4px 0 20px rgba(0, 0, 0, 0.1)',
    transition: 'right 0.3s ease',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    padding: '20px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background 0.2s ease'
  };

  const searchStyle: React.CSSProperties = {
    padding: '16px 20px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    background: theme === 'dark' ? '#334155' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    fontSize: '13px',
    outline: 'none'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '0 20px 20px'
  };

  const groupItemStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(55, 65, 81, 0.3)'
      : 'rgba(248, 250, 252, 0.8)',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '12px',
    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    transition: 'all 0.2s ease'
  };

  const groupNameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    marginBottom: '4px'
  };

  const groupDescriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '8px'
  };

  const groupMetaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: theme === 'dark' ? '#64748b' : '#94a3b8'
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => ({
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    color: 'white',
    background: status === 'active' ? '#10b981' : 
               status === 'pending' ? '#f59e0b' : '#ef4444'
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Governance List</h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ×
          </button>
        </div>
        
        <div style={searchStyle}>
          <input
            type="text"
            placeholder="Search governance entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>
        
        <div style={contentStyle}>
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              style={groupItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-2px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={groupNameStyle}>{group.name}</div>
              <div style={groupDescriptionStyle}>{group.description}</div>
              <div style={groupMetaStyle}>
                <span>{new Date(group.createdAt).toLocaleDateString()}</span>
                <span style={statusBadgeStyle(group.status)}>{group.status}</span>
              </div>
            </div>
          ))}
          
          {filteredGroups.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: theme === 'dark' ? '#64748b' : '#94a3b8',
              fontSize: '14px',
              marginTop: '40px'
            }}>
              No governance entries found
            </div>
          )}
        </div>
      </div>
    </>
  );
};
