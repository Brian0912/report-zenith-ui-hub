
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
  const [showHeaders, setShowHeaders] = useState(false);
  const [showBody, setShowBody] = useState(false);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 300 && status < 400) return '#f59e0b';
    return '#ef4444';
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const statusStyle: React.CSSProperties = {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #f3f4f6'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  };

  const sectionContentStyle: React.CSSProperties = {
    padding: '16px 24px',
    backgroundColor: '#f9fafb',
    maxHeight: '200px',
    overflow: 'auto'
  };

  return (
    <div style={cardStyle}>
      {/* Status Line */}
      <div style={statusStyle}>
        <span style={{ color: '#10b981', fontSize: '18px' }}>✅</span>
        <span style={{ fontWeight: '500', color: '#065f46' }}>Request Successful</span>
        <span style={{ fontWeight: '500', color: getStatusColor(response.status) }}>
          {response.status} {response.statusText}
        </span>
      </div>

      {/* Response Headers Section */}
      <div>
        <div 
          style={sectionHeaderStyle}
          onClick={() => setShowHeaders(!showHeaders)}
        >
          <span>Response Headers</span>
          {showHeaders ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {showHeaders && (
          <div style={sectionContentStyle}>
            <pre style={{ fontSize: '12px', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap' }}>
              {Object.entries(response.headers).map(([key, value]) => `${key}: ${value}`).join('\n')}
            </pre>
          </div>
        )}
      </div>

      {/* Response Body Section */}
      <div>
        <div 
          style={sectionHeaderStyle}
          onClick={() => setShowBody(!showBody)}
        >
          <span>Response Body</span>
          {showBody ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {showBody && (
          <div style={sectionContentStyle}>
            <pre style={{ fontSize: '12px', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap' }}>
              {response.body}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
