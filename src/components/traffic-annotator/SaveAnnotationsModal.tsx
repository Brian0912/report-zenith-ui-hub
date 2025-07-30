import React, { useState } from 'react';

interface ParsedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

interface MockResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

interface CommentData {
  text: string;
  images: string[];
}

interface FieldData {
  id: string;
  fieldPath: string;
  source: string;
  category: string;
  hasSchema: string;
  prodTag: string;
  gcpTag: string;
  deccTag: string;
  attributedTo: string;
  dataSovereignty: string;
  policyAction: string;
  linkToFinding: string;
  comment: string;
  selectedFinding?: string;
  selectedComment?: CommentData;
}

interface SaveAnnotationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  curlInput: string;
  parsedRequest: ParsedRequest | null;
  response: MockResponse | null;
  selectedFields: FieldData[];
  onSave?: (annotations: FieldData[], groupComment?: string) => void;
}

export const SaveAnnotationsModal: React.FC<SaveAnnotationsModalProps> = ({
  isOpen,
  onClose,
  selectedFields,
  onSave
}) => {
  const [groupComment, setGroupComment] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave(selectedFields, groupComment);
    }
    setGroupComment('');
    onClose();
  };

  const handleCancel = () => {
    setGroupComment('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
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
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e5e7eb'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            Add Annotations
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Add a comment for this group of {selectedFields.length} field{selectedFields.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Comment Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Group Comment
          </label>
          <textarea
            value={groupComment}
            onChange={(e) => setGroupComment(e.target.value)}
            placeholder="Enter a comment for this annotation group..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
            autoFocus
          />
        </div>

        {/* Selected Fields Preview */}
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            margin: '0 0 12px 0'
          }}>
            Selected Fields ({selectedFields.length})
          </h3>
          <div style={{
            maxHeight: '120px',
            overflow: 'auto'
          }}>
            {selectedFields.map((field, index) => (
              <div key={field.id} style={{
                fontSize: '13px',
                color: '#6b7280',
                marginBottom: index === selectedFields.length - 1 ? '0' : '6px',
                padding: '4px 0'
              }}>
                • {field.fieldPath} ({field.source} {field.category})
              </div>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f9fafb',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            Add Annotations
          </button>
        </div>
      </div>
    </div>
  );
};