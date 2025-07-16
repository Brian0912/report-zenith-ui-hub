
import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface Enhancement {
  name: string;
  timestamp?: string;
  link?: string;
}

interface EnhancementBadgeProps {
  enhancements: Enhancement[];
}

export const EnhancementBadge: React.FC<EnhancementBadgeProps> = ({ enhancements }) => {
  if (!enhancements || enhancements.length === 0) {
    return (
      <span style={{ 
        color: '#9ca3af', 
        fontSize: '12px',
        fontStyle: 'italic'
      }}>
        No enhancements
      </span>
    );
  }

  const handleEnhancementClick = (enhancement: Enhancement) => {
    if (enhancement.link) {
      console.log(`Navigate to enhancement: ${enhancement.name}`);
      // Navigation logic would go here
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1px solid #93c5fd',
    transition: 'all 0.2s ease'
  };

  const timestampStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginLeft: '4px'
  };

  return (
    <div style={containerStyle}>
      {enhancements.map((enhancement, index) => (
        <div
          key={index}
          style={badgeStyle}
          onClick={() => handleEnhancementClick(enhancement)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#bfdbfe';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dbeafe';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>{enhancement.name}</span>
          {enhancement.link && <ExternalLink size={10} />}
          {enhancement.timestamp && (
            <div style={timestampStyle}>
              <Clock size={8} style={{ display: 'inline', marginRight: '2px' }} />
              {enhancement.timestamp}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
