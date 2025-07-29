
import React from 'react';

interface RangeSliderInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeSliderInput: React.FC<RangeSliderInputProps> = ({
  value,
  onChange,
  placeholder,
  min = 0,
  max = 10000,
  step = 1
}) => {
  const numericValue = value ? parseInt(value) : min;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(Number(val)) && Number(val) >= min && Number(val) <= max)) {
      onChange(val);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={handleSliderChange}
          style={{
            flex: 1,
            height: '4px',
            background: '#e5e7eb',
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={{
            width: '80px',
            padding: '6px 8px',
            fontSize: '14px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            outline: 'none',
            textAlign: 'right'
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6b7280'
        }}
      >
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
