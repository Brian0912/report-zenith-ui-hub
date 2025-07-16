
import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface ColumnVisibilityState {
  prodTag: boolean;
  gcpTag: boolean;
  deccTag: boolean;
}

interface ColumnVisibilityDropdownProps {
  visibility: ColumnVisibilityState;
  onVisibilityChange: (visibility: ColumnVisibilityState) => void;
}

export const ColumnVisibilityDropdown: React.FC<ColumnVisibilityDropdownProps> = ({
  visibility,
  onVisibilityChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = (column: keyof ColumnVisibilityState) => {
    onVisibilityChange({
      ...visibility,
      [column]: !visibility[column]
    });
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#374151'
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '4px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '180px',
    padding: '8px'
  };

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151'
  };

  const columns = [
    { key: 'prodTag' as const, label: 'Prod Tag' },
    { key: 'gcpTag' as const, label: 'GCP Tag' },
    { key: 'deccTag' as const, label: 'DECC Tag' }
  ];

  return (
    <div style={dropdownStyle}>
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        <Eye size={16} />
        Visible Columns
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div style={menuStyle}>
          {columns.map((column) => (
            <div
              key={column.key}
              style={menuItemStyle}
              onClick={() => toggleColumn(column.key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {visibility[column.key] ? (
                <Eye size={16} color="#059669" />
              ) : (
                <EyeOff size={16} color="#9ca3af" />
              )}
              <span>{column.label}</span>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
