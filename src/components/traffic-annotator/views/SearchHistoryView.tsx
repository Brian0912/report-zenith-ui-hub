import React, { useState } from 'react';
import { Search, Clock, Star, MoreVertical } from 'lucide-react';

interface HistoryItem {
  id: string;
  curlCommand: string;
  timestamp: string;
  status: number;
  method: string;
  url: string;
  isStarred: boolean;
}

interface SearchHistoryViewProps {
  onLoadCurl: (curl: string) => void;
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({ onLoadCurl }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [historyItems] = useState<HistoryItem[]>([
    {
      id: '1',
      curlCommand: 'curl -X POST https://api.example.com/login -H "Content-Type: application/json" -d \'{"username":"admin","password":"secret"}\'',
      timestamp: '2024-01-15 16:45:23',
      status: 200,
      method: 'POST',
      url: 'https://api.example.com/login',
      isStarred: true
    },
    {
      id: '2',
      curlCommand: 'curl -X GET https://api.example.com/users?page=1&limit=10 -H "Authorization: Bearer token123"',
      timestamp: '2024-01-15 16:30:15',
      status: 200,
      method: 'GET',
      url: 'https://api.example.com/users',
      isStarred: false
    },
    {
      id: '3',
      curlCommand: 'curl -X PUT https://api.example.com/profile/123 -H "Content-Type: application/json" -d \'{"name":"John Doe","email":"john@example.com"}\'',
      timestamp: '2024-01-15 15:20:45',
      status: 404,
      method: 'PUT',
      url: 'https://api.example.com/profile/123',
      isStarred: false
    },
    {
      id: '4',
      curlCommand: 'curl -X DELETE https://api.example.com/posts/456 -H "Authorization: Bearer token123"',
      timestamp: '2024-01-15 14:15:30',
      status: 403,
      method: 'DELETE',
      url: 'https://api.example.com/posts/456',
      isStarred: true
    },
    {
      id: '5',
      curlCommand: 'curl -X GET https://api.example.com/status -H "Accept: application/json"',
      timestamp: '2024-01-15 13:45:12',
      status: 200,
      method: 'GET',
      url: 'https://api.example.com/status',
      isStarred: false
    }
  ]);

  const filteredItems = historyItems.filter(item =>
    item.curlCommand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return 'hsl(var(--success))';
    if (status >= 400 && status < 500) return 'hsl(var(--warning))';
    if (status >= 500) return 'hsl(var(--destructive))';
    return 'hsl(var(--muted-foreground))';
  };

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return '#10B981';
      case 'POST': return '#3B82F6';
      case 'PUT': return '#F59E0B';
      case 'DELETE': return '#EF4444';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const handleItemClick = (curlCommand: string) => {
    onLoadCurl(curlCommand);
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    height: '100%',
    overflow: 'auto'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '24px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px 12px 44px',
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'hsl(var(--muted-foreground))'
  };

  const historyListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const historyItemStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative'
  };

  const itemHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const methodBadgeStyle = (method: string): React.CSSProperties => ({
    backgroundColor: getMethodColor(method),
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase'
  });

  const statusBadgeStyle = (status: number): React.CSSProperties => ({
    color: getStatusColor(status),
    backgroundColor: `${getStatusColor(status)}20`,
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600'
  });

  const curlCommandStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'hsl(var(--muted-foreground))',
    backgroundColor: 'hsl(var(--muted))',
    padding: '8px 12px',
    borderRadius: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '8px'
  };

  const timestampStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'hsl(var(--muted-foreground))',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'hsl(var(--muted-foreground))',
    opacity: 0,
    transition: 'all 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          <Search size={24} />
          Search History
        </h1>
        
        <div style={searchContainerStyle}>
          <Search size={18} style={searchIconStyle} />
          <input
            type="text"
            placeholder="Search cURL commands, URLs, or methods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--primary))';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--border))';
            }}
          />
        </div>
      </div>

      <div style={historyListStyle}>
        {filteredItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'hsl(var(--muted-foreground))'
          }}>
            {searchTerm ? 'No matching results found' : 'No history items found'}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              style={historyItemStyle}
              onClick={() => handleItemClick(item.curlCommand)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                const actionBtn = e.currentTarget.querySelector('[data-action-btn]') as HTMLElement;
                if (actionBtn) actionBtn.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--card))';
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = 'none';
                const actionBtn = e.currentTarget.querySelector('[data-action-btn]') as HTMLElement;
                if (actionBtn) actionBtn.style.opacity = '0';
              }}
            >
              <div style={itemHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={methodBadgeStyle(item.method)}>{item.method}</span>
                  <span style={statusBadgeStyle(item.status)}>{item.status}</span>
                  {item.isStarred && (
                    <Star size={14} style={{ color: 'hsl(var(--warning))', fill: 'currentColor' }} />
                  )}
                </div>
                <button
                  data-action-btn
                  style={actionButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle action menu
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div style={curlCommandStyle}>{item.curlCommand}</div>
              
              <div style={timestampStyle}>
                <Clock size={12} />
                {item.timestamp}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};