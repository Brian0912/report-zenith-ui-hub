
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { sharedStyles } from '../shared/styles';
import { MockResponse } from './CurlAnalysisPanel';

interface ResponseSectionProps {
  response: MockResponse;
}

export const ResponseSection: React.FC<ResponseSectionProps> = ({ response }) => {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 300 && status < 400) return '#f59e0b';
    return '#ef4444';
  };

  const successStyle: React.CSSProperties = {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const statusStyle: React.CSSProperties = {
    color: getStatusColor(response.status),
    fontWeight: '600',
    fontSize: '14px'
  };

  const messageStyle: React.CSSProperties = {
    color: '#166534',
    fontSize: '14px',
    margin: 0
  };

  return (
    <div style={successStyle}>
      <CheckCircle size={20} style={{ color: '#10b981' }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ color: '#166534', fontWeight: '600', fontSize: '14px' }}>Request Successful</span>
          <span style={statusStyle}>{response.status} {response.statusText}</span>
        </div>
        <p style={messageStyle}>Field analysis completed. Review the compliance data below.</p>
      </div>
    </div>
  );
};
