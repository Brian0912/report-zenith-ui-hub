
import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';

interface HistoryItem {
  id: number;
  timestamp: string;
  method: string;
  url: string;
  status: number;
  curlCommand: string;
}

interface RequestHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCurl: (curl: string) => void;
}

export const RequestHistory: React.FC<RequestHistoryProps> = ({
  isOpen,
  onClose,
  onLoadCurl
}) => {
  const [history] = useState<HistoryItem[]>([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      method: 'POST',
      url: 'https://api.example.com/users',
      status: 200,
      curlCommand: `curl -X POST 'https://api.example.com/users' -H 'Content-Type: application/json' -d '{"name": "John Doe", "email": "john@example.com"}'`
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      method: 'GET',
      url: 'https://api.example.com/data?userId=123',
      status: 200,
      curlCommand: `curl -X GET 'https://api.example.com/data?userId=123' -H 'Authorization: Bearer token123'`
    }
  ]);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return '#059669';
    if (status >= 300 && status < 400) return '#d97706';
    return '#dc2626';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    width: '600px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const closeButtonStyle: React.CSSProperties = {
    color: '#6b7280',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'transparent'
  };

  const contentStyle: React.CSSProperties = {
    padding: '16px 24px 24px',
    maxHeight: '60vh',
    overflow: 'auto'
  };

  const historyItemStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>
            <Clock size={20} />
            Request History
          </h3>
          <button onClick={onClose} style={closeButtonStyle}>
            <X size={20} />
          </button>
        </div>
        
        <div style={contentStyle}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              <p>No request history yet.</p>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Send your first cURL request to see it here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                style={historyItemStyle}
                onClick={() => onLoadCurl(item.curlCommand)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {item.method}
                    </span>
                    <span style={{ color: getStatusColor(item.status), fontWeight: '500' }}>
                      {item.status}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
                
                <div style={{ fontSize: '14px', color: '#111827', marginBottom: '8px' }}>
                  {item.url}
                </div>
                
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px',
                  padding: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#6b7280',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.curlCommand}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
