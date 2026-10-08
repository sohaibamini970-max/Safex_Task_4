import React, { useState, useRef } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Content to display inside the tooltip popup */
  content: React.ReactNode;
  /** Anchor trigger element */
  children: React.ReactElement;
  /** Preferred placement */
  position?: TooltipPosition;
  /** Custom delay in ms before showing */
  delay?: number;
  /** Custom className */
  className?: string;
  /** Test identifier */
  dataTestId?: string;
}

/**
 * Tooltip component for technical print explanations (e.g. DPI, CMYK color profiles, Bleed dimensions).
 *
 * Design Tokens Used:
 * - Color: --tooltip-bg, --tooltip-fg
 * - Spacing: --pp-space-1, --pp-space-2, --pp-space-3
 * - Radius: --tooltip-radius, --pp-radius-sm
 * - Shadow: --tooltip-shadow, --pp-shadow-md
 * - Typography: --pp-font-size-xs, --font-body
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 100,
  className = '',
  dataTestId = 'tooltip',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: 'var(--pp-space-2)',
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: 'var(--pp-space-2)',
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: 'var(--pp-space-2)',
        };
      case 'top':
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: 'var(--pp-space-2)',
        };
    }
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      data-testid={dataTestId}
    >
      {children}

      {isVisible && (
        <span
          role="tooltip"
          data-testid={`${dataTestId}-content`}
          style={{
            position: 'absolute',
            zIndex: 40,
            backgroundColor: 'var(--tooltip-bg)',
            color: 'var(--tooltip-fg)',
            padding: 'var(--pp-space-1) var(--pp-space-3)',
            borderRadius: 'var(--tooltip-radius)',
            fontSize: 'var(--pp-font-size-xs)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            boxShadow: 'var(--tooltip-shadow)',
            pointerEvents: 'none',
            fontFamily: 'var(--font-body)',
            ...getPositionStyles(),
          }}
          className={className}
        >
          {content}
        </span>
      )}
    </span>
  );
};
