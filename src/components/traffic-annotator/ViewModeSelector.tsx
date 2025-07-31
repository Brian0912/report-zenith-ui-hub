
import React from 'react';
import { LayoutGrid, List, Layers3, Grid } from 'lucide-react';

export type ViewMode = 'table' | 'grouped' | 'compact' | 'tabs';

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  currentMode,
  onModeChange
}) => {
  const modes = [
    { key: 'table' as const, label: 'Table', icon: Grid },
    { key: 'grouped' as const, label: 'Grouped', icon: LayoutGrid },
    { key: 'compact' as const, label: 'Compact', icon: List },
    { key: 'tabs' as const, label: 'Tabs', icon: Layers3 }
  ];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    backgroundColor: 'hsl(var(--muted))',
    borderRadius: '8px',
    padding: '2px'
  };

  const getButtonStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '500',
    cursor: 'pointer',
    color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
    boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.2s'
  });

  return (
    <div style={containerStyle}>
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.key;
        
        return (
          <button
            key={mode.key}
            style={getButtonStyle(isActive)}
            onClick={() => onModeChange(mode.key)}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon size={16} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
};
