
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
    top: '80px', // Below the header
    right: 0,
    width: '45%',
    minWidth: '500px',
    height: 'calc(100vh - 80px)',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
    boxShadow: theme === 'dark' 
      ? '-8px 0 32px rgba(0, 0, 0, 0.4)' 
      : '-8px 0 32px rgba(0, 0, 0, 0.15)',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: theme === 'dark' ? '1px solid #2d3748' : '1px solid #e2e8f0',
    borderRight: 'none'
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px',
    borderBottom: theme === 'dark' ? '1px solid #2d3748' : '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme === 'dark' ? '#a0aec0' : '#718096',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: '80px', // Below the header
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.4s ease, visibility 0.4s ease',
    zIndex: 999
  };

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
              e.currentTarget.style.backgroundColor = theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.05)';
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
