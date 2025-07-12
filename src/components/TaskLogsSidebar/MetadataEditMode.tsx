
import React, { useState } from 'react';
import { Edit3, X, Check } from 'lucide-react';
import { EnhancedMetadataEditor } from '../EnhancedMetadataEditor';

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
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export const MetadataEditMode: React.FC<MetadataEditModeProps> = ({
  metadata,
  onChange,
  disabled = false,
  hasUnsavedChanges = false,
  onSave,
  onCancel
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMetadata, setEditingMetadata] = useState(metadata);

  const handleStartEdit = () => {
    setEditingMetadata([...metadata]);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onChange(editingMetadata);
    setIsEditing(false);
    onSave?.();
  };

  const handleCancelEdit = () => {
    setEditingMetadata([...metadata]);
    setIsEditing(false);
    onCancel?.();
  };

  const getMetadataLabel = (category: string, key: string) => {
    const categoryLabels: Record<string, Record<string, string>> = {
      priority: { high: 'High Priority', medium: 'Medium Priority', low: 'Low Priority', urgent: 'Urgent' },
      type: { feature: 'Feature Request', bug: 'Bug Fix', enhancement: 'Enhancement', research: 'Research', documentation: 'Documentation' },
      team: { frontend: 'Frontend', backend: 'Backend', design: 'Design', qa: 'Quality Assurance', devops: 'DevOps' },
      complexity: { simple: 'Simple', moderate: 'Moderate', complex: 'Complex', expert: 'Expert Level' }
    };
    
    return categoryLabels[category]?.[key] || key;
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
            <button
              onClick={handleSaveEdit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: '#10B981',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#10B981';
              }}
            >
              <Check size={12} />
              Save
            </button>
          </div>
        </div>
        <EnhancedMetadataEditor
          metadata={editingMetadata}
          onChange={setEditingMetadata}
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
          metadata.map((meta) => (
            <div key={meta.id} style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#3b82f6',
                marginBottom: '4px',
                textTransform: 'capitalize'
              }}>
                {meta.category} • {getMetadataLabel(meta.category, meta.key)}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#4b5563',
                lineHeight: '1.4'
              }}>
                {meta.value || 'No value set'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
