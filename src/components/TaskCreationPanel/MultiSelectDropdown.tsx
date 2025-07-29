
import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface MultiSelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedValues = value ? value.split(',').map(v => v.trim()).filter(Boolean) : [];

  const handleToggle = (option: string) => {
    const currentValues = selectedValues;
    const newValues = currentValues.includes(option)
      ? currentValues.filter(v => v !== option)
      : [...currentValues, option];
    
    onChange(newValues.join(', '));
  };

  const handleRemove = (option: string) => {
    const newValues = selectedValues.filter(v => v !== option);
    onChange(newValues.join(', '));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          minHeight: '36px',
          padding: '6px 32px 6px 8px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          alignItems: 'center'
        }}
      >
        {selectedValues.length === 0 ? (
          <span style={{ color: '#9ca3af' }}>{placeholder}</span>
        ) : (
          selectedValues.map((val) => (
            <div
              key={val}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(val);
              }}
            >
              {val}
              <X size={12} />
            </div>
          ))
        )}
        <ChevronDown
          size={16}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }}
        />
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            overflow: 'auto',
            marginTop: '2px'
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleToggle(option)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #f3f4f6',
                fontSize: '14px',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{option}</span>
              {selectedValues.includes(option) && (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
