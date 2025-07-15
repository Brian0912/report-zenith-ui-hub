
import React, { useState, useRef } from 'react';
import { Textarea } from '../ui/textarea';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface CommentData {
  text: string;
  images: string[];
}

interface CommentEditorProps {
  value: CommentData;
  onChange: (value: CommentData) => void;
  placeholder?: string;
}

export const CommentEditor: React.FC<CommentEditorProps> = ({
  value,
  onChange,
  placeholder = "Add your comment..."
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (text: string) => {
    onChange({ ...value, text });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          onChange({
            ...value,
            images: [...value.images, imageUrl]
          });
        };
        reader.readAsDataURL(file);
      }
    });

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = value.images.filter((_, i) => i !== index);
    onChange({ ...value, images: newImages });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ position: 'relative' }}>
        <Textarea
          value={value.text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight: '80px', paddingRight: '40px' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '4px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Upload image"
        >
          <ImageIcon size={16} />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {value.images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {value.images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '60px',
                height: '60px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #d1d5db'
              }}
            >
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}
                title="Remove image"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
