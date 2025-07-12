
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { MetadataSelector } from './TaskCreationPanel/MetadataSelector';
import { MetadataItem } from './TaskCreationPanel/MetadataItem';
import { MetadataItemType } from './TaskCreationPanel/types';

interface EnhancedMetadataEditorProps {
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

export const EnhancedMetadataEditor: React.FC<EnhancedMetadataEditorProps> = ({ 
  metadata, 
  onChange, 
  disabled = false 
}) => {
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Convert metadata to MetadataItemType format
  const metadataItems: MetadataItemType[] = metadata.map(meta => ({
    id: meta.id,
    category: meta.category,
    key: meta.key,
    value: meta.value
  }));

  const handleAddMetadata = (categoryKey: string, optionKey: string) => {
    const newItem = {
      id: `${categoryKey}-${optionKey}-${Date.now()}`,
      category: categoryKey,
      key: optionKey,
      value: ''
    };
    onChange([...metadata, newItem]);
    setShowSelector(false);
    setSearchTerm('');
  };

  const handleUpdateMetadata = (id: string, value: string) => {
    const updatedMetadata = metadata.map(item => 
      item.id === id ? { ...item, value } : item
    );
    onChange(updatedMetadata);
  };

  const handleRemoveMetadata = (id: string) => {
    const filteredMetadata = metadata.filter(item => item.id !== id);
    onChange(filteredMetadata);
  };

  if (disabled) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {metadata.map((meta) => (
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
              {meta.category} • {meta.key}
            </div>
            <div style={{ 
              fontSize: '13px', 
              color: '#4b5563',
              lineHeight: '1.4'
            }}>
              {meta.value || 'No value set'}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {metadataItems.map((item) => (
          <MetadataItem
            key={item.id}
            item={item}
            onUpdate={handleUpdateMetadata}
            onRemove={handleRemoveMetadata}
          />
        ))}
        
        {/* Add New Button */}
        <button
          onClick={() => setShowSelector(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: 'transparent',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.color = '#3b82f6';
            e.currentTarget.style.backgroundColor = '#f0f9ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.color = '#6b7280';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Plus size={16} />
          Add Metadata
        </button>
      </div>

      {/* Metadata Selector */}
      <MetadataSelector
        isOpen={showSelector}
        onClose={() => {
          setShowSelector(false);
          setSearchTerm('');
        }}
        onSelect={handleAddMetadata}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
};
