
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { FindingDropdown } from './FindingDropdown';
import { CommentEditor } from './CommentEditor';

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

interface FieldEditModalProps {
  field: FieldData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (fieldId: string, finding?: string, comment?: CommentData) => void;
}

export const FieldEditModal: React.FC<FieldEditModalProps> = ({
  field,
  isOpen,
  onClose,
  onSave
}) => {
  const [selectedFinding, setSelectedFinding] = useState(field?.selectedFinding || '');
  const [comment, setComment] = useState<CommentData>(field?.selectedComment || { text: '', images: [] });

  React.useEffect(() => {
    if (field) {
      setSelectedFinding(field.selectedFinding || '');
      setComment(field.selectedComment || { text: '', images: [] });
    }
  }, [field]);

  const handleSave = () => {
    if (field) {
      onSave(field.id, selectedFinding, comment);
      onClose();
    }
  };

  if (!field) return null;

  const modalStyle: React.CSSProperties = {
    maxWidth: '600px',
    width: '90vw'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
    display: 'block'
  };

  const fieldInfoStyle: React.CSSProperties = {
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={modalStyle}>
        <DialogHeader>
          <DialogTitle>Edit Field Annotation</DialogTitle>
          <DialogDescription>
            Update the finding and comment for this field
          </DialogDescription>
        </DialogHeader>

        <div style={fieldInfoStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: '500', color: '#111827' }}>
              {field.fieldPath}
            </span>
            <span style={{ 
              backgroundColor: '#dbeafe', 
              color: '#1e40af', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {field.source} {field.category}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {field.prodTag} • {field.attributedTo} • {field.policyAction}
          </div>
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Finding</label>
          <FindingDropdown
            value={selectedFinding}
            onValueChange={setSelectedFinding}
          />
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>Comment</label>
          <CommentEditor
            value={comment}
            onChange={setComment}
            placeholder="Add your annotation comment..."
          />
        </div>

        <DialogFooter style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
