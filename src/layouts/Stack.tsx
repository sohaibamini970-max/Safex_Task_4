import React, { forwardRef } from 'react';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackGap = 'none' | '1' | '2' | '3' | '4' | '6' | '8' | '10' | '12' | '16';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex layout direction */
  direction?: StackDirection;
  /** Gap scale mapped to design tokens */
  gap?: StackGap;
  /** Cross-axis alignment */
  align?: StackAlign;
  /** Main-axis distribution */
  justify?: StackJustify;
  /** Whether items can wrap onto multiple lines */
  wrap?: boolean;
}

/**
 * Stack layout primitive organizing children along horizontal or vertical axes
 * using standard design token spacing gaps.
 *
 * Design Tokens Used:
 * - Spacing: --pp-space-1 through --pp-space-16
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      direction = 'column',
      gap = '4',
      align = 'stretch',
      justify = 'start',
      wrap = false,
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

    const getAlignValue = (): string => {
      switch (align) {
        case 'start': return 'flex-start';
        case 'end': return 'flex-end';
        case 'center': return 'center';
        case 'baseline': return 'baseline';
        case 'stretch':
        default: return 'stretch';
      }
    };

    const getJustifyValue = (): string => {
      switch (justify) {
        case 'start': return 'flex-start';
        case 'end': return 'flex-end';
        case 'center': return 'center';
        case 'between': return 'space-between';
        case 'around': return 'space-around';
        case 'evenly': return 'space-evenly';
        default: return 'flex-start';
      }
    };

    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      gap: getGapValue(),
      alignItems: getAlignValue(),
      justifyContent: getJustifyValue(),
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={rootStyle}
        className={className}
        data-direction={direction}
        data-gap={gap}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
