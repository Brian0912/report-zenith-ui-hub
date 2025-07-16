
import React, { useState } from 'react';

interface ResizableTableHeaderProps {
  children: React.ReactNode;
  width?: number;
  minWidth?: number;
  onResize?: (width: number) => void;
}

export const ResizableTableHeader: React.FC<ResizableTableHeaderProps> = ({
  children,
  width = 150,
  minWidth = 80,
  onResize
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(width);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(width);
    
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
      onResize?.(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <th
      style={{
        position: 'relative',
        width: `${width}px`,
        minWidth: `${minWidth}px`,
        padding: '12px',
        textAlign: 'left',
        fontWeight: '600',
        color: 'hsl(var(--foreground))',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid hsl(var(--border))',
        backgroundColor: 'hsl(var(--muted) / 0.5)',
        userSelect: isResizing ? 'none' : 'auto'
      }}
    >
      {children}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '4px',
          cursor: 'col-resize',
          backgroundColor: isResizing ? '#4F46E5' : 'transparent',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          if (!isResizing) {
            e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isResizing) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      />
    </th>
  );
};
