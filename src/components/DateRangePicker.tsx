
import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (range: { start: Date; end: Date }) => void;
  disabled?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  startDate, 
  endDate, 
  onChange, 
  disabled = false 
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [editingStart, setEditingStart] = useState(true);
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(start);
    
    const endStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(end);
    
    return `${startStr} - ${endStr}`;
  };

  const handleDateChange = (date: Date) => {
    if (editingStart) {
      setTempStart(date);
      setEditingStart(false);
    } else {
      setTempEnd(date);
      onChange({ start: tempStart, end: date });
      setShowPicker(false);
      setEditingStart(true);
    }
  };

  const handleCancel = () => {
    setTempStart(startDate);
    setTempEnd(endDate);
    setShowPicker(false);
    setEditingStart(true);
  };

  if (disabled) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#1a202c',
        fontWeight: '500'
      }}>
        <Calendar size={16} style={{ color: '#6b7280' }} />
        {formatDateRange(startDate, endDate)}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid transparent',
          transition: 'all 0.2s ease',
          fontSize: '14px',
          color: '#1a202c',
          fontWeight: '500'
        }}
        onClick={() => setShowPicker(!showPicker)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F9FAFB';
          e.currentTarget.style.borderColor = '#E5E7EB';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'transparent';
        }}
      >
        <Calendar size={16} style={{ color: '#6b7280' }} />
        {formatDateRange(startDate, endDate)}
        <ChevronDown 
          size={14} 
          style={{ 
            transform: showPicker ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </div>

      {showPicker && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          marginTop: '4px',
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          padding: '16px',
          minWidth: '300px'
        }}>
          <div style={{ marginBottom: '12px', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
            {editingStart ? 'Select Start Date' : 'Select End Date'}
          </div>
          
          <input
            type="date"
            value={editingStart ? tempStart.toISOString().split('T')[0] : tempEnd.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '14px',
              marginBottom: '12px'
            }}
          />
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
