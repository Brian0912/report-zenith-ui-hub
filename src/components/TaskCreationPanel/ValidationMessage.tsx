
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationMessageProps {
  isValid: boolean;
  message: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ isValid, message }) => {
  if (isValid) return null;
  return (
    <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
      <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
      {message}
    </div>
  );
};
