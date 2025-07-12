
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface SlideOutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SlideOutPanel: React.FC<SlideOutPanelProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: '80px',
    right: 0,
    width: '100%',
    maxWidth: '480px',
    minWidth: '400px',
    height: 'calc(100vh - 80px)',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
    boxShadow: '-6px 0 32px rgba(0, 0, 0, 0.12)',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: 'none'
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px 24px 16px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    minHeight: '80px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0,
    lineHeight: '1.3',
    paddingRight: '16px'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#718096',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    width: '36px',
    height: '36px',
    flexShrink: 0
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#fafafa',
    padding: '0'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    zIndex: 999,
    backdropFilter: 'blur(2px)'
  };

  // Responsive adjustments
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  if (mediaQuery.matches) {
    panelStyle.width = '100%';
    panelStyle.minWidth = '100%';
    panelStyle.maxWidth = '100%';
    panelStyle.borderTopLeftRadius = '0';
    panelStyle.borderBottomLeftRadius = '0';
  }

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={panelStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
};
