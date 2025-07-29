
import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import { MetadataItemType, METADATA_CATEGORIES } from './types';
import { AutocompleteInput } from './AutocompleteInput';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import { RangeSliderInput } from './RangeSliderInput';

interface MetadataItemProps {
  item: MetadataItemType;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

export const MetadataItem: React.FC<MetadataItemProps> = ({ item, onUpdate, onRemove }) => {
  const category = METADATA_CATEGORIES[item.category];
  const option = category.options.find(opt => opt.key === item.key);
  const IconComponent = category.icon;

  const renderInput = () => {
    if (!option) return null;

    const commonInputStyle: React.CSSProperties = {
      width: '100%',
      padding: '8px',
      fontSize: '14px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      outline: 'none'
    };

    switch (option.inputType) {
      case 'autocomplete':
        return (
          <AutocompleteInput
            value={item.value}
            onChange={(value) => onUpdate(item.id, value)}
            placeholder={option.placeholder}
            examples={option.examples}
          />
        );

      case 'dropdown':
        return (
          <div style={{ position: 'relative' }}>
            <select
              value={item.value}
              onChange={(e) => onUpdate(item.id, e.target.value)}
              style={{
                ...commonInputStyle,
                appearance: 'none',
                paddingRight: '32px',
                cursor: 'pointer'
              }}
            >
              <option value="">{option.placeholder}</option>
              {option.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                pointerEvents: 'none'
              }}
            />
          </div>
        );

      case 'multiselect':
        return (
          <MultiSelectDropdown
            value={item.value}
            onChange={(value) => onUpdate(item.id, value)}
            options={option.options || []}
            placeholder={option.placeholder}
          />
        );

      case 'datetime':
        return (
          <input
            type="datetime-local"
            value={item.value}
            onChange={(e) => onUpdate(item.id, e.target.value)}
            style={commonInputStyle}
          />
        );

      case 'range':
        return (
          <RangeSliderInput
            value={item.value}
            onChange={(value) => onUpdate(item.id, value)}
            placeholder={option.placeholder}
            max={option.key.includes('nodes') ? 5000 : 100}
          />
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            value={item.value}
            onChange={(e) => onUpdate(item.id, e.target.value)}
            placeholder={option.placeholder}
            style={commonInputStyle}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbeafe',
        flexShrink: 0,
        marginTop: '4px'
      }}>
        <IconComponent size={16} style={{ color: '#2563eb' }} />
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {category.name}
            </span>
            <span style={{ fontSize: '12px', color: '#d1d5db' }}>•</span>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1f2937'
            }}>
              {option?.label}
            </span>
            {option?.inputType && (
              <span style={{
                fontSize: '10px',
                fontWeight: '500',
                color: '#6b7280',
                backgroundColor: '#f3f4f6',
                padding: '2px 6px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {option.inputType}
              </span>
            )}
          </div>
          
          {option?.description && (
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.4'
            }}>
              {option.description}
            </p>
          )}

          {option?.examples && option.examples.length > 0 && (
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>
              Examples: {option.examples.join(', ')}
            </div>
          )}

          <div style={{ marginTop: '4px' }}>
            {renderInput()}
          </div>
        </div>
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
          padding: '6px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '4px'
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
        <X size={16} />
      </button>
    </div>
  );
};
