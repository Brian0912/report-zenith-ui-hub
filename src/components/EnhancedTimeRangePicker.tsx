
import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';

interface TimeRange {
  start: Date;
  end: Date;
}

interface EnhancedTimeRangePickerProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  disabled?: boolean;
}

const TIME_PRESETS = [
  { label: '24 Hours', hours: 24 },
  { label: '7 Days', hours: 24 * 7 },
  { label: '14 Days', hours: 24 * 14 },
  { label: '30 Days', hours: 24 * 30 },
  { label: '90 Days', hours: 24 * 90 }
];

export const EnhancedTimeRangePicker: React.FC<EnhancedTimeRangePickerProps> = ({ 
  value, 
  onChange, 
  disabled = false 
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

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

  const handlePresetSelect = (preset: typeof TIME_PRESETS[0]) => {
    const end = new Date();
    const start = new Date(end.getTime() - (preset.hours * 60 * 60 * 1000));
    onChange({ start, end });
    setSelectedPreset(preset.label);
    setShowPicker(false);
  };

  const handleCustomDateChange = (field: 'start' | 'end', dateStr: string) => {
    const newDate = new Date(dateStr);
    if (field === 'start') {
      onChange({ start: newDate, end: value.end });
    } else {
      onChange({ start: value.start, end: newDate });
    }
    setSelectedPreset(null);
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
        {formatDateRange(value.start, value.end)}
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
        {formatDateRange(value.start, value.end)}
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
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          padding: '16px',
          minWidth: '320px'
        }}>
          {/* Preset Options */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Quick Select
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TIME_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetSelect(preset)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    backgroundColor: selectedPreset === preset.label ? '#F0F9FF' : 'transparent',
                    color: selectedPreset === preset.label ? '#0369A1' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPreset !== preset.label) {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPreset !== preset.label) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Selection */}
          <div>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Custom Range
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '11px', 
                  color: '#6b7280', 
                  marginBottom: '4px',
                  fontWeight: '500'
                }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={value.start.toISOString().split('T')[0]}
                  onChange={(e) => handleCustomDateChange('start', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '11px', 
                  color: '#6b7280', 
                  marginBottom: '4px',
                  fontWeight: '500'
                }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={value.end.toISOString().split('T')[0]}
                  onChange={(e) => handleCustomDateChange('end', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              onClick={() => setShowPicker(false)}
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
