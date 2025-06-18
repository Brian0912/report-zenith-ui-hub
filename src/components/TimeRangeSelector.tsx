
import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface TimeRangeSelectorProps {
  onTimeRangeChange: (range: { start: Date; end: Date }) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onTimeRangeChange }) => {
  const { theme } = useTheme();
  const [selectedRange, setSelectedRange] = useState('7d');

  const timeRanges = [
    { value: '1h', label: '1 Hour', hours: 1 },
    { value: '24h', label: '24 Hours', hours: 24 },
    { value: '7d', label: '7 Days', hours: 24 * 7 },
    { value: '30d', label: '30 Days', hours: 24 * 30 },
    { value: '90d', label: '90 Days', hours: 24 * 90 }
  ];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    border: 'none',
    background: isActive
      ? (theme === 'dark' 
          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)')
      : (theme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'),
    color: isActive ? 'white' : (theme === 'dark' ? '#D1D5DB' : '#6B7280'),
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.75rem',
    fontWeight: '500'
  });

  const handleRangeSelect = (range: typeof timeRanges[0]) => {
    setSelectedRange(range.value);
    const now = new Date();
    const start = new Date(now.getTime() - (range.hours * 60 * 60 * 1000));
    onTimeRangeChange({ start, end: now });
  };

  return (
    <div style={containerStyle}>
      {timeRanges.map(range => (
        <button
          key={range.value}
          style={buttonStyle(selectedRange === range.value)}
          onClick={() => handleRangeSelect(range)}
          onMouseEnter={(e) => {
            if (selectedRange !== range.value) {
              e.currentTarget.style.background = theme === 'dark'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedRange !== range.value) {
              e.currentTarget.style.background = theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';
            }
          }}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};
