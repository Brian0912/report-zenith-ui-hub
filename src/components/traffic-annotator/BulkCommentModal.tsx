
import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { CommentEditor } from './CommentEditor';

interface CommentData {
  text: string;
  images: string[];
}

interface FieldData {
  id: string;
  fieldPath: string;
}

interface BulkCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFields: FieldData[];
  onSave: (comment: CommentData) => void;
}

export const BulkCommentModal: React.FC<BulkCommentModalProps> = ({
  isOpen,
  onClose,
  selectedFields,
  onSave
}) => {
  const [comment, setComment] = useState<CommentData>({ text: '', images: [] });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(comment);
    setComment({ text: '', images: [] });
    onClose();
  };

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} color="#4F46E5" />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
              Add Comment to {selectedFields.length} Fields
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '4px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={20} color="#6b7280" />
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            This comment will be added to all {selectedFields.length} selected fields.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <CommentEditor
            value={comment}
            onChange={setComment}
            placeholder="Enter your comment for all selected fields..."
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              ...buttonStyle,
              backgroundColor: '#f3f4f6',
              color: '#374151'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              ...buttonStyle,
              backgroundColor: '#4F46E5',
              color: '#ffffff'
            }}
          >
            <MessageSquare size={16} />
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};
