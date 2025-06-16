
import * as React from "react"

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, style, onClick, ...props }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      if (onClick) {
        onClick();
      } else if (onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        disabled={disabled}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '44px',
          height: '24px',
          background: checked ? '#10b981' : '#cbd5e1',
          borderRadius: '12px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          border: 'none',
          outline: 'none',
          opacity: disabled ? 0.7 : 1,
          ...style
        }}
        {...props}
      >
        <div style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }} />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
