
import React, { useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { METADATA_CATEGORIES } from './types';
import { useDebounce } from './hooks';
import { VALIDATION_RULES } from './validation';

interface MetadataSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (categoryKey: string, optionKey: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const MetadataSelector: React.FC<MetadataSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  searchTerm, 
  onSearchChange 
}) => {
  const debouncedSearch = useDebounce(searchTerm, VALIDATION_RULES.DEBOUNCE_DELAY);
  
  const filteredOptions = useMemo(() => 
    Object.entries(METADATA_CATEGORIES).map(([categoryKey, category]) => ({
      categoryKey,
      category,
      options: category.options.filter(option =>
        debouncedSearch === '' ||
        option.label.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        category.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    })).filter(({ options }) => options.length > 0),
    [debouncedSearch]
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        maxHeight: '320px',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h4 style={{ fontWeight: '500', color: '#1f2937', margin: 0, fontSize: '14px' }}>Select Metadata</h4>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Close metadata selector"
          >
            <X size={16} />
          </button>
        </div>
        
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search metadata..."
            style={{
              width: '100%',
              paddingLeft: '36px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
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
      </div>
      
      <div style={{ maxHeight: '256px', overflowY: 'auto' }}>
        {filteredOptions.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            No metadata found matching "{searchTerm}"
          </div>
        ) : (
          filteredOptions.map(({ categoryKey, category, options }) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryKey} style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#dbeafe'
                  }}>
                    <IconComponent size={12} style={{ color: '#2563eb' }} />
                  </div>
                  <span style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>{category.name}</span>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {options.length}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {options.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => onSelect(categoryKey, option.key)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px',
                        fontSize: '14px',
                        color: '#374151',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title={option.placeholder}
                    >
                      <div style={{ fontWeight: '500' }}>{option.label}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>{option.placeholder}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
