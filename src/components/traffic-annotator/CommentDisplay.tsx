
import React from 'react';
import { Edit3 } from 'lucide-react';

interface CommentData {
  text: string;
  images: string[];
}

interface CommentDisplayProps {
  comment?: CommentData;
  onEdit?: () => void;
}

export const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment, onEdit }) => {
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
              backgroundColor: '#2563eb',
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
          border: '1px solid #e5e7eb'
        }}>
          {comment.text}
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
