import React, { forwardRef } from 'react';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 'none' | '2' | '3' | '4' | '6' | '8' | '10' | '12';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed or responsive column count */
  cols?: GridColumns;
  /** Gap between columns and rows */
  gap?: GridGap;
  /** Responsive auto-fit min column width (e.g. 280px) */
  minColWidth?: string;
}

/**
 * Grid layout primitive providing multi-column responsive arrangements
 * using standard design token spacing scales.
 *
 * Design Tokens Used:
 * - Spacing: --pp-space-2, --pp-space-3, --pp-space-4, --pp-space-6, --pp-space-8, --pp-space-12
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      cols = 3,
      gap = '6',
      minColWidth,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getGapValue = (): string => {
      if (gap === 'none') return '0';
      return `var(--pp-space-${gap})`;
    };

    const rootStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: minColWidth
        ? `repeat(auto-fit, minmax(${minColWidth}, 1fr))`
        : `repeat(${cols}, minmax(0, 1fr))`,
      gap: getGapValue(),
      width: '100%',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={rootStyle}
        className={className}
        data-cols={cols}
        data-gap={gap}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
