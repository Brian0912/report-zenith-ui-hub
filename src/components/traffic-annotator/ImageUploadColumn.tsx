
import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadColumnProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const ImageUploadColumn: React.FC<ImageUploadColumnProps> = ({
  images,
  onImagesChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          onImagesChange([...images, imageUrl]);
        };
        reader.readAsDataURL(file);
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          color: '#374151'
        }}
      >
        <Upload size={14} />
        Upload Image
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '40px',
                height: '40px',
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

      {images.length === 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#9ca3af',
          fontSize: '12px'
        }}>
          <ImageIcon size={14} />
          No images
        </div>
      )}
    </div>
  );
};
