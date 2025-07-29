import React, { useState } from 'react';
import { Search, Clock, Star } from 'lucide-react';

interface AnalysisItem {
  id: string;
  name: string;
  curlCommand: string;
  timestamp: string;
  isStarred: boolean;
  isShared?: boolean;
  sharedBy?: string;
}

interface SearchHistoryViewProps {
  onSelectItem: (item: AnalysisItem) => void;
  items: AnalysisItem[];
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({
  onSelectItem,
  items
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.curlCommand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateCommand = (command: string, maxLength: number = 80) => {
    return command.length > maxLength ? `${command.substring(0, maxLength)}...` : command;
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const searchBarStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '24px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px 12px 48px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    transition: 'border-color 0.2s'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const itemStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const itemHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px'
  };

  const itemTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const itemMetaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '12px',
    color: '#6b7280'
  };

  const itemContentStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#4b5563',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '48px 24px',
    color: '#6b7280'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px' }}>
        Search History
      </h2>

      {/* Search Bar */}
      <div style={searchBarStyle}>
        <div style={searchIconStyle}>
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search analysis history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#4f46e5';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        />
      </div>

      {/* Results List */}
      <div style={listStyle}>
        {filteredItems.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
              {searchTerm ? 'No results found' : 'No analysis history available'}
            </p>
            <p style={{ fontSize: '14px' }}>
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Run some analysis to see results here'
              }
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              style={itemStyle}
              onClick={() => onSelectItem(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4f46e5';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={itemHeaderStyle}>
                <h3 style={itemTitleStyle}>
                  {item.name}
                  {item.isShared && item.sharedBy && (
                    <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '400', marginLeft: '8px' }}>
                      shared by {item.sharedBy}
                    </span>
                  )}
                </h3>
                
                <div style={itemMetaStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {formatTimestamp(item.timestamp)}
                  </div>
                  {item.isStarred && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={12} fill="#fbbf24" color="#fbbf24" />
                      Starred
                    </div>
                  )}
                </div>
              </div>
              
              <div style={itemContentStyle}>
                {truncateCommand(item.curlCommand)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};