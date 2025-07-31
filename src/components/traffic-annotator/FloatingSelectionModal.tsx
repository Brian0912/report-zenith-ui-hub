import React from 'react';
import { Check, Eye } from 'lucide-react';
import { FieldData } from './FieldAnalysisSection';

interface FloatingSelectionModalProps {
  selectedFields: FieldData[];
  onViewAnnotate: () => void;
}

export const FloatingSelectionModal: React.FC<FloatingSelectionModalProps> = ({
  selectedFields,
  onViewAnnotate
}) => {
  if (selectedFields.length === 0) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          backgroundColor: '#10b981',
          borderRadius: '50%'
        }}>
          <Check size={12} color="#ffffff" />
        </div>
        <span>{selectedFields.length} row{selectedFields.length === 1 ? '' : 's'} selected</span>
      </div>

      <button
        onClick={onViewAnnotate}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#059669';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#10b981';
        }}
      >
        <Eye size={16} />
        View & Annotate
      </button>
    </div>
  );
};