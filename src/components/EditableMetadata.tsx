
import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { METADATA_CATEGORIES } from './TaskCreationPanel/types';

interface MetadataItem {
  id: string;
  category: string;
  key: string;
  value: string;
}

interface EditableMetadataProps {
  metadata: MetadataItem[];
  onChange: (metadata: MetadataItem[]) => void;
  disabled?: boolean;
}

export const EditableMetadata: React.FC<EditableMetadataProps> = ({ 
  metadata, 
  onChange, 
  disabled = false 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const getMetadataLabel = (category: string, key: string) => {
    const categoryData = METADATA_CATEGORIES[category as keyof typeof METADATA_CATEGORIES];
    if (!categoryData) return key;
    
    const option = categoryData.options.find(opt => opt.key === key);
    return option?.label || key;
  };

  const startEditing = (meta: MetadataItem) => {
    setEditingId(meta.id);
    setEditValue(meta.value);
  };

  const saveEdit = () => {
    if (editingId) {
      const updatedMetadata = metadata.map(meta => 
        meta.id === editingId ? { ...meta, value: editValue } : meta
      );
      onChange(updatedMetadata);
      setEditingId(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {metadata.map((meta) => {
        const categoryData = METADATA_CATEGORIES[meta.category as keyof typeof METADATA_CATEGORIES];
        const categoryIcon = categoryData?.icon;
        
        return (
          <div key={meta.id} style={{
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            {categoryIcon && (
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#dbeafe',
                flexShrink: 0
              }}>
                {React.createElement(categoryIcon, { size: 14, style: { color: '#2563eb' } })}
              </div>
            )}
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: '#3b82f6',
                marginBottom: '4px',
                textTransform: 'capitalize'
              }}>
                {categoryData?.name || meta.category} • {getMetadataLabel(meta.category, meta.key)}
              </div>
              
              {editingId === meta.id ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '4px 8px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                  />
                  <button
                    onClick={saveEdit}
                    style={{
                      padding: '4px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Check size={12} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      padding: '4px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#4b5563',
                    lineHeight: '1.4'
                  }}>
                    {meta.value || 'No value set'}
                  </div>
                  
                  {!disabled && (
                    <button
                      onClick={() => startEditing(meta)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        opacity: 0.5,
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                    >
                      <Pencil size={12} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
