import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { FieldData, CommentData } from './FieldAnalysisSection';

interface AnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFields: FieldData[];
  onConfirm: (name: string, comment: string, images: string[]) => void;
}

export const AnnotationModal: React.FC<AnnotationModalProps> = ({
  isOpen,
  onClose,
  selectedFields,
  onConfirm
}) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onConfirm(name, comment, images);
    setName('');
    setComment('');
    setImages([]);
    onClose();
  };

  const handleCancel = () => {
    setName('');
    setComment('');
    setImages([]);
    onClose();
  };

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
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 24px 0 24px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a202c',
            margin: 0
          }}>
            Create Annotation
          </h2>
          <button
            onClick={handleCancel}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '24px',
          overflow: 'auto',
          flex: 1
        }}>
          {/* Selected Fields */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}>
              Selected Fields:
            </h3>
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#f9fafb',
              padding: '16px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {selectedFields.map((field, index) => (
                <div
                  key={field.id}
                  style={{
                    marginBottom: index === selectedFields.length - 1 ? '0' : '8px',
                    fontSize: '13px',
                    color: '#1f2937'
                  }}
                >
                  <span style={{ fontWeight: '500' }}>• {field.fieldPath}</span>
                  <span style={{ color: '#6b7280', marginLeft: '8px' }}>
                    ({field.source} {field.category}): {field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Annotation Name */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Annotation Name:
            </h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter annotation name..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Comments */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Comments:
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comments about these fields..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Attachments */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Attachments:
            </h3>
            
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}>
              <Upload size={16} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>

            {/* Image Previews */}
            {images.length > 0 && (
              <div style={{
                marginTop: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={12} color="#ffffff" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          padding: '16px 24px 24px 24px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={handleCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};