
import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface ColumnVisibilityState {
  group: boolean;
  value: boolean;
  hasSchema: boolean;
  prodTag: boolean;
  gcpTag: boolean;
  deccTag: boolean;
  attributedTo: boolean;
  dataSovereignty: boolean;
  policyAction: boolean;
  enhancements: boolean;
  finding: boolean;
  comment: boolean;
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
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    color: 'hsl(var(--foreground))',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '4px',
    backgroundColor: '#ffffff',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    minWidth: '200px',
    padding: '8px'
  };

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'hsl(var(--foreground))',
    transition: 'background-color 0.2s'
  };

  const columns = [
    { key: 'group' as const, label: 'Group' },
    { key: 'value' as const, label: 'Value' },
    { key: 'hasSchema' as const, label: 'Has Schema' },
    { key: 'prodTag' as const, label: 'Prod Tag' },
    { key: 'gcpTag' as const, label: 'GCP Tag' },
    { key: 'deccTag' as const, label: 'DECC Tag' },
    { key: 'attributedTo' as const, label: 'Attributed To' },
    { key: 'dataSovereignty' as const, label: 'Data Sovereignty' },
    { key: 'policyAction' as const, label: 'Policy Action' },
    { key: 'enhancements' as const, label: 'Enhancements' },
    { key: 'finding' as const, label: 'Finding' },
    { key: 'comment' as const, label: 'Comment' }
  ];

  return (
    <div style={dropdownStyle}>
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
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
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {visibility[column.key] ? (
                <Eye size={16} color="hsl(var(--primary))" />
              ) : (
                <EyeOff size={16} color="hsl(var(--muted-foreground))" />
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
