import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  method: string;
  url: string;
  timestamp: Date;
  status: number;
}

interface SearchHistoryViewProps {
  onResultClick: (result: SearchResult) => void;
}

// Mock search results
const mockSearchResults: SearchResult[] = [
  {
    id: 'search-1',
    title: 'User Authentication API',
    method: 'POST',
    url: '/api/auth/login',
    timestamp: new Date('2024-01-16T10:30:00'),
    status: 200
  },
  {
    id: 'search-2',
    title: 'Product Catalog API',
    method: 'GET',
    url: '/api/products',
    timestamp: new Date('2024-01-15T14:20:00'),
    status: 200
  },
  {
    id: 'search-3',
    title: 'Order Processing API',
    method: 'POST',
    url: '/api/orders/create',
    timestamp: new Date('2024-01-15T09:15:00'),
    status: 201
  },
  {
    id: 'search-4',
    title: 'Payment Gateway API',
    method: 'POST',
    url: '/api/payments/process',
    timestamp: new Date('2024-01-14T16:45:00'),
    status: 400
  },
  {
    id: 'search-5',
    title: 'File Upload API',
    method: 'POST',
    url: '/api/upload/file',
    timestamp: new Date('2024-01-14T11:30:00'),
    status: 200
  }
];

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({ onResultClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = mockSearchResults.filter(result =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    maxWidth: '800px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '24px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px 12px 48px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b'
  };

  const resultStyle: React.CSSProperties = {
    padding: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '12px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease'
  };

  const resultHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  };

  const resultTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  };

  const statusStyle: React.CSSProperties = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const resultDetailsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    fontSize: '14px',
    color: '#64748b'
  };

  const methodBadgeStyle: React.CSSProperties = {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff'
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return { backgroundColor: '#10b981', color: '#ffffff' };
    if (status >= 300 && status < 400) return { backgroundColor: '#f59e0b', color: '#ffffff' };
    if (status >= 400) return { backgroundColor: '#ef4444', color: '#ffffff' };
    return { backgroundColor: '#6b7280', color: '#ffffff' };
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return { backgroundColor: '#3b82f6' };
      case 'POST': return { backgroundColor: '#10b981' };
      case 'PUT': return { backgroundColor: '#f59e0b' };
      case 'DELETE': return { backgroundColor: '#ef4444' };
      default: return { backgroundColor: '#6b7280' };
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
        Search History
      </h2>
      
      <div style={searchContainerStyle}>
        <div style={searchIconStyle}>
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search by endpoint, method, or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        />
      </div>

      <div>
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div
              key={result.id}
              style={resultStyle}
              onClick={() => onResultClick(result)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={resultHeaderStyle}>
                <h3 style={resultTitleStyle}>{result.title}</h3>
                <div style={{ ...statusStyle, ...getStatusColor(result.status) }}>
                  {result.status}
                </div>
              </div>
              <div style={resultDetailsStyle}>
                <div style={{ ...methodBadgeStyle, ...getMethodColor(result.method) }}>
                  {result.method}
                </div>
                <span>{result.url}</span>
                <span>{formatTimestamp(result.timestamp)}</span>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            color: '#64748b',
            fontSize: '16px'
          }}>
            {searchTerm ? 'No results found for your search.' : 'No search history available.'}
          </div>
        )}
      </div>
    </div>
  );
};