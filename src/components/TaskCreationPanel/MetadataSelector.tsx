
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
  
  const filteredCategories = useMemo(() => 
    Object.entries(METADATA_CATEGORIES).map(([categoryKey, category]) => ({
      categoryKey,
      category,
      options: category.options.filter(option =>
        debouncedSearch === '' ||
        option.label.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        option.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        category.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        option.examples.some(example => 
          example.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
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
        maxHeight: '480px',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ 
            fontWeight: '600', 
            color: '#1f2937', 
            margin: 0, 
            fontSize: '16px' 
          }}>
            Add Metadata Field
          </h4>
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
            <X size={18} />
          </button>
        </div>
        
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#9ca3af' 
          }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search metadata fields..."
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '12px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              outline: 'none',
              backgroundColor: '#f9fafb'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.backgroundColor = '#f9fafb';
            }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
        {filteredCategories.length === 0 ? (
          <div style={{ 
            padding: '32px 16px', 
            textAlign: 'center', 
            color: '#6b7280', 
            fontSize: '14px' 
          }}>
            <div style={{ marginBottom: '8px', fontSize: '16px' }}>🔍</div>
            No metadata fields found matching "{searchTerm}"
          </div>
        ) : (
          filteredCategories.map(({ categoryKey, category, options }) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryKey} style={{ borderBottom: '1px solid #f3f4f6' }}>
                {/* Category Header */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#dbeafe'
                    }}>
                      <IconComponent size={16} style={{ color: '#2563eb' }} />
                    </div>
                    <div>
                      <h5 style={{ 
                        fontWeight: '600', 
                        color: '#1f2937', 
                        fontSize: '15px',
                        margin: 0,
                        marginBottom: '2px'
                      }}>
                        {category.name}
                      </h5>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {category.description}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      backgroundColor: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      marginLeft: 'auto'
                    }}>
                      {options.length} field{options.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                {/* Options List */}
                <div style={{ padding: '8px 0' }}>
                  {options.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => onSelect(categoryKey, option.key)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#374151',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontWeight: '600', 
                            marginBottom: '4px',
                            color: '#1f2937'
                          }}>
                            {option.label}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#6b7280', 
                            marginBottom: '6px',
                            lineHeight: '1.4'
                          }}>
                            {option.description}
                          </div>
                          {option.examples && option.examples.length > 0 && (
                            <div style={{ 
                              fontSize: '11px', 
                              color: '#9ca3af',
                              fontStyle: 'italic'
                            }}>
                              Examples: {option.examples.slice(0, 2).join(', ')}
                              {option.examples.length > 2 && '...'}
                            </div>
                          )}
                        </div>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '500',
                          color: '#6b7280',
                          backgroundColor: '#f3f4f6',
                          padding: '3px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          marginLeft: '12px',
                          flexShrink: 0
                        }}>
                          {option.inputType}
                        </span>
                      </div>
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
