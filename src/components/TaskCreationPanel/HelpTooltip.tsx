
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ isVisible, onToggle }) => {
  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        aria-label="Help"
        onClick={onToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#64748b',
          padding: '4px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
      >
        <HelpCircle size={18} />
      </button>
      {isVisible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '280px',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            zIndex: 1000
          }}
        >
          <p style={{ margin: 0 }}>
            Use the form to clearly define your task's goal and background. Add metadata to help categorize and track your task effectively.
          </p>
        </div>
      )}
    </div>
  );
};
