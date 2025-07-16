
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit3 } from 'lucide-react';

interface CommentData {
  text: string;
  images: string[];
}

interface ExpandableCommentProps {
  comment?: CommentData;
  onEdit?: () => void;
  maxLines?: number;
}

export const ExpandableComment: React.FC<ExpandableCommentProps> = ({ 
  comment, 
  onEdit, 
  maxLines = 2 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasContent = comment && (comment.text.trim() || comment.images.length > 0);

  if (!hasContent) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#9ca3af', fontSize: '14px' }}>No comment</span>
        {onEdit && (
          <button
            onClick={onEdit}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Edit3 size={12} />
            Add Comment
          </button>
        )}
      </div>
    );
  }

  const lines = comment.text.split('\n');
  const needsExpansion = lines.length > maxLines;
  const displayText = needsExpansion && !isExpanded 
    ? lines.slice(0, maxLines).join('\n') + '...'
    : comment.text;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {comment.text && (
        <div style={{ 
          fontSize: '14px', 
          color: '#111827',
          lineHeight: '1.4',
          padding: '8px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
          position: 'relative'
        }}>
          <div style={{ whiteSpace: 'pre-wrap' }}>{displayText}</div>
          
          {needsExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                padding: '2px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#4F46E5',
                display: 'flex',
                alignItems: 'center'
              }}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      )}
      
      {comment.images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {comment.images.map((image, index) => (
            <div
              key={index}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #d1d5db'
              }}
            >
              <img
                src={image}
                alt={`Comment image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      {onEdit && (
        <button
          onClick={onEdit}
          style={{
            padding: '2px 6px',
            fontSize: '12px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Edit3 size={10} />
          Edit
        </button>
      )}
    </div>
  );
};
