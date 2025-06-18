
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Calendar } from './ui/calendar';

interface DateSelectorProps {
  onDateChange: (date: Date | undefined) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '1rem'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    border: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.2)' 
      : '1px solid rgba(0, 0, 0, 0.2)',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)',
    color: selectedDate 
      ? (theme === 'dark' ? '#F3F4F6' : '#111827')
      : (theme === 'dark' ? '#9CA3AF' : '#6B7280'),
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '500',
    minWidth: '200px',
    justifyContent: 'flex-start'
  };

  const calendarContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 50,
    marginTop: '0.25rem',
    background: theme === 'dark' 
      ? 'rgba(17, 24, 39, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '8px',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme === 'dark'
      ? '0 10px 25px rgba(0, 0, 0, 0.5)'
      : '0 10px 25px rgba(0, 0, 0, 0.15)',
    padding: '0.5rem'
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateChange(date);
    setIsCalendarOpen(false);
  };

  const handleButtonClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleButtonClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme === 'dark'
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)';
        }}
      >
        <CalendarIcon size={16} />
        {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
      </button>
      
      {isCalendarOpen && (
        <div style={calendarContainerStyle} onClick={handleClickOutside}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
            style={{
              background: 'transparent',
              color: theme === 'dark' ? '#F3F4F6' : '#111827'
            }}
          />
        </div>
      )}
    </div>
  );
};
