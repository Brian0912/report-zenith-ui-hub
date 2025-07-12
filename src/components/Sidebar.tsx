
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

  // Get all menu items from all groups for collapsed view
  const allMenuItems = productGroups.flatMap(group => group.subItems);

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
    color: '#111827',
    transition: 'all 0.3s ease'
  };

  const menuStyle: React.CSSProperties = {
    padding: '2rem 0',
    flex: 1
  };

  const groupLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem'
  };

  const subItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '0.75rem' : '0.75rem 1.5rem',
    margin: '0.25rem 0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#f3f4f6' : 'transparent',
    color: '#374151',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderRadius: '0px',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  });

  const subIconContainerStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: isCollapsed ? '0' : '0.75rem',
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

  const groupContainerStyle: React.CSSProperties = {
    marginBottom: '2rem'
  };

  const collapsedMenuStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    paddingTop: '1rem'
  };

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
          {isCollapsed ? '💎' : '💎  Crystal'}
        </div>
      </div>

      <nav style={menuStyle} role="navigation" aria-label="Main navigation">
        {isCollapsed ? (
          // Collapsed view - show only icons for all menu items
          <div style={collapsedMenuStyle}>
            {allMenuItems.map(item => {
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
                  title={item.label}
                >
                  <div style={subIconContainerStyle}>
                    <ItemIconComponent size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Expanded view - show grouped structure
          productGroups.map(group => {
            const isGroupExpanded = expandedGroups.includes(group.id);
            
            return (
              <div key={group.id} style={groupContainerStyle}>
                <div style={groupLabelStyle}>
                  {group.label}
                </div>

                {isGroupExpanded && (
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
                            <ItemIconComponent size={16} />
                          </div>
                          <div style={labelContainerStyle}>
                            {item.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>
    </div>
  );
};
