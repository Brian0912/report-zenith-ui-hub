
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';

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
  curlInput,
  parsedRequest,
  response,
  selectedFields,
  onSave
}) => {
  const [groupComment, setGroupComment] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave(selectedFields, groupComment);
    }
    setGroupComment(''); // Clear comment after saving
    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ 
        maxWidth: '400px', 
        width: '90vw',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50
      }}>
        <DialogHeader>
          <DialogTitle>Add Annotations</DialogTitle>
          <DialogDescription>
            Add a comment for this group of {selectedFields.length} field{selectedFields.length !== 1 ? 's' : ''}
          </DialogDescription>
        </DialogHeader>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            marginBottom: '8px', 
            color: '#111827' 
          }}>
            Group Comment:
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
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            autoFocus
          />
        </div>

        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '20px'
        }}>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: '500', 
            marginBottom: '8px', 
            color: '#111827' 
          }}>
            Selected Fields:
          </div>
          <div style={{ maxHeight: '120px', overflow: 'auto' }}>
            {selectedFields.map((field, index) => (
              <div key={field.id} style={{ 
                fontSize: '12px', 
                color: '#6b7280',
                marginBottom: index === selectedFields.length - 1 ? '0' : '4px'
              }}>
                • {field.fieldPath} ({field.source} {field.category})
              </div>
            ))}
          </div>
        </div>

        <DialogFooter style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Add Annotations
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
