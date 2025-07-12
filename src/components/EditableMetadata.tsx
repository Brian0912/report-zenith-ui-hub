
import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

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
    const categoryLabels: Record<string, Record<string, string>> = {
      priority: { high: 'High Priority', medium: 'Medium Priority', low: 'Low Priority', urgent: 'Urgent' },
      type: { feature: 'Feature Request', bug: 'Bug Fix', enhancement: 'Enhancement', research: 'Research', documentation: 'Documentation' },
      team: { frontend: 'Frontend', backend: 'Backend', design: 'Design', qa: 'Quality Assurance', devops: 'DevOps' },
      complexity: { simple: 'Simple', moderate: 'Moderate', complex: 'Complex', expert: 'Expert Level' }
    };
    
    return categoryLabels[category]?.[key] || key;
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
      {metadata.map((meta) => (
        <div key={meta.id} style={{
          padding: '12px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          position: 'relative'
        }}>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: '600',
            color: '#3b82f6',
            marginBottom: '4px',
            textTransform: 'capitalize'
          }}>
            {getMetadataLabel(meta.category, meta.key)}
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
                {meta.value}
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
      ))}
    </div>
  );
};
