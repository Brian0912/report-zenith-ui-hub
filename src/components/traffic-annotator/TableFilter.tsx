
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface FilterProps {
  column: string;
  values: string[];
  onFilter: (column: string, value: string) => void;
  onSort: (column: string, direction: 'asc' | 'desc' | null) => void;
  sortDirection: 'asc' | 'desc' | null;
}

export const TableFilter: React.FC<FilterProps> = ({ 
  column, 
  values, 
  onFilter, 
  onSort, 
  sortDirection 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredValues = values.filter(value => 
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dropdownStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '200px',
    padding: '8px'
  };

  const getSortIcon = () => {
    if (sortDirection === 'asc') return <ArrowUp size={12} />;
    if (sortDirection === 'desc') return <ArrowDown size={12} />;
    return <ArrowUpDown size={12} />;
  };

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc';
    onSort(column, newDirection);
  };

  return (
    <div style={dropdownStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          style={buttonStyle}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter size={12} />
        </button>
        <button
          style={buttonStyle}
          onClick={handleSort}
        >
          {getSortIcon()}
        </button>
      </div>

      {isOpen && (
        <>
          <div style={menuStyle}>
            <div style={{ marginBottom: '8px' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            </div>
            <div style={{ maxHeight: '150px', overflow: 'auto' }}>
              {filteredValues.map((value, index) => (
                <div
                  key={index}
                  style={{
                    padding: '6px 8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  onClick={() => {
                    onFilter(column, value);
                    setIsOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
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
        </>
      )}
    </div>
  );
};
