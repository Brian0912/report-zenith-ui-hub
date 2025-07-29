
import React, { useState } from 'react';
import { Edit3, X } from 'lucide-react';
import { EnhancedMetadataEditor } from '../EnhancedMetadataEditor';
import { METADATA_CATEGORIES } from '../TaskCreationPanel/types';

interface MetadataEditModeProps {
  metadata: Array<{
    id: string;
    category: string;
    key: string;
    value: string;
  }>;
  onChange: (metadata: Array<{
    id: string;
    category: string;
    key: string;
    value: string;
  }>) => void;
  disabled?: boolean;
}

export const MetadataEditMode: React.FC<MetadataEditModeProps> = ({
  metadata,
  onChange,
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMetadata, setEditingMetadata] = useState(metadata);

  const handleStartEdit = () => {
    setEditingMetadata([...metadata]);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingMetadata([...metadata]);
    setIsEditing(false);
    // Reset to original metadata
    onChange(metadata);
  };

  // Update parent when editing metadata changes
  const handleMetadataChange = (newMetadata: typeof metadata) => {
    setEditingMetadata(newMetadata);
    onChange(newMetadata);
  };

  const getMetadataLabel = (category: string, key: string) => {
    const categoryData = METADATA_CATEGORIES[category as keyof typeof METADATA_CATEGORIES];
    if (!categoryData) return key;
    
    const option = categoryData.options.find(opt => opt.key === key);
    return option?.label || key;
  };

  if (isEditing) {
    return (
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Metadata
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleCancelEdit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: 'transparent',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                color: '#6B7280',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={12} />
              Cancel
            </button>
          </div>
        </div>
        <EnhancedMetadataEditor
          metadata={editingMetadata}
          onChange={handleMetadataChange}
          disabled={false}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Metadata
        </div>
        {!disabled && (
          <button
            onClick={handleStartEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              color: '#6B7280',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.borderColor = '#9CA3AF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
          >
            <Edit3 size={12} />
            Edit
          </button>
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {metadata.length === 0 ? (
          <div style={{
            padding: '12px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            color: '#6B7280',
            fontSize: '13px',
            textAlign: 'center'
          }}>
            No metadata available
          </div>
        ) : (
          metadata.map((meta) => {
            const categoryData = METADATA_CATEGORIES[meta.category as keyof typeof METADATA_CATEGORIES];
            const categoryIcon = categoryData?.icon;
            
            return (
              <div key={meta.id} style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
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
                  <div style={{
                    fontSize: '13px',
                    color: '#4b5563',
                    lineHeight: '1.4'
                  }}>
                    {meta.value || 'No value set'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
