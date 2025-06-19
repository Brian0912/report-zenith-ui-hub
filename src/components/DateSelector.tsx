
import React, { useState } from 'react';
import { DatePicker } from '@arco-design/web-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import dayjs, { Dayjs } from 'dayjs';

interface DateSelectorProps {
  onDateChange: (dateRange: { start: Date; end: Date } | undefined) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const { theme } = useTheme();
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs] | undefined>();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '1rem'
  };

  const datePickerStyle: React.CSSProperties = {
    width: '300px'
  };

  const handleDateRangeChange = (dateStrings: string[], dates: [Dayjs, Dayjs]) => {
    const newDateRange = dates || undefined;
    setSelectedDateRange(newDateRange);
    // Convert Dayjs array to Date range for the parent component
    if (newDateRange && newDateRange[0] && newDateRange[1]) {
      onDateChange({
        start: newDateRange[0].toDate(),
        end: newDateRange[1].toDate()
      });
    } else {
      onDateChange(undefined);
    }
  };

  return (
    <div style={containerStyle}>
      <DatePicker.RangePicker
        style={datePickerStyle}
        placeholder={['Start date', 'End date']}
        value={selectedDateRange}
        onChange={handleDateRangeChange}
        allowClear
        prefix={<CalendarIcon size={16} />}
      />
    </div>
  );
};
