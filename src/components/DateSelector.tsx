
import React, { useState } from 'react';
import { DatePicker } from '@arco-design/web-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface DateSelectorProps {
  onDateChange: (date: Date | undefined) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '1rem'
  };

  const datePickerStyle: React.CSSProperties = {
    width: '200px'
  };

  const handleDateChange = (dateString: string, date: Date) => {
    const newDate = date || undefined;
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div style={containerStyle}>
      <DatePicker
        style={datePickerStyle}
        placeholder="Select date"
        value={selectedDate}
        onChange={handleDateChange}
        allowClear
        prefix={<CalendarIcon size={16} />}
      />
    </div>
  );
};
