
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
        color: 'hsl(var(--muted-foreground))', 
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
    justifyContent: 'space-between',
    gap: '8px',
    padding: '4px 8px',
    backgroundColor: 'hsl(var(--primary) / 0.1)',
    color: 'hsl(var(--primary))',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1px solid hsl(var(--primary) / 0.2)',
    transition: 'all 0.2s ease',
    minWidth: '0'
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '0'
  };

  const timestampStyle: React.CSSProperties = {
    fontSize: '10px',
    color: 'hsl(var(--muted-foreground))',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyle}>
      {enhancements.map((enhancement, index) => (
        <div
          key={index}
          style={badgeStyle}
          onClick={() => handleEnhancementClick(enhancement)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.15)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={contentStyle}>
            <span>{enhancement.name}</span>
            {enhancement.timestamp && (
              <div style={timestampStyle}>
                <Clock size={8} style={{ display: 'inline', marginRight: '2px' }} />
                {enhancement.timestamp}
              </div>
            )}
          </div>
          {enhancement.link && <ExternalLink size={10} />}
        </div>
      ))}
    </div>
  );
};
