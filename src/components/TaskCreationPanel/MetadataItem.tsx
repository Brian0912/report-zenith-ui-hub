
import React from 'react';
import { X } from 'lucide-react';
import { MetadataItemType, METADATA_CATEGORIES } from './types';

interface MetadataItemProps {
  item: MetadataItemType;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

export const MetadataItem: React.FC<MetadataItemProps> = ({ item, onUpdate, onRemove }) => {
  const category = METADATA_CATEGORIES[item.category];
  const option = category.options.find(opt => opt.key === item.key);
  const IconComponent = category.icon;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbeafe',
        flexShrink: 0
      }}>
        <IconComponent size={12} style={{ color: '#2563eb' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>{category.name}</span>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>•</span>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#1f2937' }}>{option?.label}</span>
        </div>
        <input
          type="text"
          value={item.value}
          onChange={(e) => onUpdate(item.id, e.target.value)}
          placeholder={option?.placeholder || 'Enter value...'}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 1px #3b82f6';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label="Remove metadata"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9ca3af',
          padding: '4px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ef4444';
          e.currentTarget.style.backgroundColor = '#fef2f2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#9ca3af';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};
