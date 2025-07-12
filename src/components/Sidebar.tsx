
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { productGroups } from './sidebar/constants';
import { ProductGroup } from './sidebar/types';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['sentinel', 'aplus']);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupActive = (group: ProductGroup) => {
    return group.subItems.some(item => location.pathname === item.path);
  };

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '80px' : '280px',
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '1.25rem' : '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    transition: 'all 0.3s ease'
  };

  const menuStyle: React.CSSProperties = {
    padding: '1rem 0',
    flex: 1
  };

  const groupStyle = (isActive: boolean): React.CSSProperties => ({
    margin: '0.25rem 0.5rem'
  });

  const groupHeaderStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#3b82f6' : 'transparent',
    color: isActive ? '#ffffff' : '#1f2937',
    fontWeight: '600',
    minHeight: '48px'
  });

  const subItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem 0.5rem 2rem',
    margin: '0.125rem 0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#f3f4f6' : 'transparent',
    color: isActive ? '#1f2937' : '#6b7280',
    fontSize: '0.875rem',
    minHeight: '40px'
  });

  const iconContainerStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: isCollapsed ? '0' : '0.75rem',
    transition: 'all 0.3s ease',
    flexShrink: 0
  };

  const subIconContainerStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: isCollapsed ? '0' : '0.5rem',
    transition: 'all 0.3s ease',
    flexShrink: 0
  };

  const labelContainerStyle: React.CSSProperties = {
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: 1
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
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
    color: '#6b7280',
    transition: 'all 0.2s ease',
    zIndex: 1001,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const chevronStyle = (isExpanded: boolean): React.CSSProperties => ({
    marginLeft: 'auto',
    transition: 'transform 0.2s ease',
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    flexShrink: 0
  });

  return (
    <div style={sidebarStyle}>
      <button 
        style={toggleButtonStyle} 
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <div style={headerStyle}>
        <div style={logoStyle}>
          {isCollapsed ? '💎' : '💎 Crystal'}
        </div>
      </div>

      <nav style={menuStyle} role="navigation" aria-label="Main navigation">
        {productGroups.map(group => {
          const isGroupExpanded = expandedGroups.includes(group.id);
          const isActive = isGroupActive(group);
          const IconComponent = group.icon;
          
          return (
            <div key={group.id} style={groupStyle(isActive)}>
              <div 
                style={groupHeaderStyle(isActive)}
                onClick={() => {
                  if (!isCollapsed) {
                    toggleGroup(group.id);
                  }
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                role="button"
                aria-expanded={!isCollapsed ? isGroupExpanded : undefined}
                aria-label={`${group.label} section`}
              >
                <div style={iconContainerStyle}>
                  <IconComponent 
                    size={20} 
                    style={{ 
                      color: 'currentColor',
                      display: 'block'
                    }} 
                  />
                </div>
                {!isCollapsed && (
                  <div style={labelContainerStyle}>
                    <span>{group.label}</span>
                  </div>
                )}
                {!isCollapsed && (
                  <div style={chevronStyle(isGroupExpanded)}>
                    <ChevronRight size={16} />
                  </div>
                )}
              </div>

              {!isCollapsed && isGroupExpanded && (
                <div role="group" aria-label={`${group.label} items`}>
                  {group.subItems.map(item => {
                    const isItemActiveState = isItemActive(item.path);
                    const ItemIconComponent = item.icon;
                    
                    return (
                      <div 
                        key={item.id}
                        style={subItemStyle(isItemActiveState)}
                        onClick={() => navigate(item.path)}
                        onMouseEnter={e => {
                          if (!isItemActiveState) {
                            e.currentTarget.style.backgroundColor = '#f9fafb';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isItemActiveState) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                        role="button"
                        aria-label={`Navigate to ${item.label}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate(item.path);
                          }
                        }}
                      >
                        <div style={subIconContainerStyle}>
                          <ItemIconComponent 
                            size={16} 
                            style={{ 
                              color: 'currentColor',
                              display: 'block'
                            }} 
                          />
                        </div>
                        <div style={labelContainerStyle}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.125rem' }}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
