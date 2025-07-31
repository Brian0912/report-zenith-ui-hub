import React from 'react';
import { CheckCircle, Eye } from 'lucide-react';

interface FloatingSelectionModalProps {
  selectedCount: number;
  onViewAnnotate: () => void;
}

export const FloatingSelectionModal: React.FC<FloatingSelectionModalProps> = ({
  selectedCount,
  onViewAnnotate
}) => {
  if (selectedCount === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckCircle size={20} style={{ color: '#10b981' }} />
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151' 
        }}>
          {selectedCount} row{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>
      
      <button
        onClick={onViewAnnotate}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3b82f6';
        }}
      >
        <Eye size={16} />
        View/Annotate
      </button>
    </div>
  );
};