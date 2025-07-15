
import React from 'react';

interface MockResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

interface ResponseDisplayPanelProps {
  response: MockResponse;
}

export const ResponseDisplayPanel: React.FC<ResponseDisplayPanelProps> = ({ response }) => {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return '#059669';
    if (status >= 300 && status < 400) return '#d97706';
    return '#dc2626';
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const successBannerStyle: React.CSSProperties = {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px'
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px'
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <div style={successBannerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: '#059669', fontSize: '20px' }}>✅</span>
            <span style={{ fontWeight: '500', color: '#065f46' }}>Request Successful</span>
            <span style={{ fontWeight: '500', color: getStatusColor(response.status) }}>
              {response.status} {response.statusText}
            </span>
          </div>
          <p style={{ color: '#047857', fontSize: '14px', margin: 0 }}>
            Field analysis completed. Review the compliance data below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
              Response Headers
            </h3>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '12px' }}>
              <pre style={{ fontSize: '12px', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap' }}>
                {Object.entries(response.headers).map(([key, value]) => `${key}: ${value}`).join('\n')}
              </pre>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
              Response Body
            </h3>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '12px', maxHeight: '200px', overflow: 'auto' }}>
              <pre style={{ fontSize: '12px', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap' }}>
                {response.body}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
