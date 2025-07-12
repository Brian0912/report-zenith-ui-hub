
import React from 'react';

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ isCollapsed, onToggle }) => {
  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '-12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    zIndex: 1001,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  return (
    <button 
      style={toggleButtonStyle} 
      onClick={onToggle}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#f9fafb';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#ffffff';
      }}
    >
      {isCollapsed ? '→' : '←'}
    </button>
  );
};
