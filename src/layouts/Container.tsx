import React, { forwardRef } from 'react';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width threshold */
  maxWidth?: ContainerMaxWidth;
  /** Inner responsive padding scale */
  padding?: boolean;
}

/**
 * Container layout primitive for centering content and restraining viewport dimensions.
 *
 * Design Tokens Used:
 * - Spacing: --pp-space-4, --pp-space-6, --pp-space-8
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      maxWidth = 'xl',
      padding = true,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getMaxWidthValue = (): string => {
      switch (maxWidth) {
        case 'sm': return '40rem';   // 640px
        case 'md': return '48rem';   // 768px
        case 'lg': return '64rem';   // 1024px
        case 'xl': return '80rem';   // 1280px
        case '2xl': return '96rem';  // 1536px
        case 'full': return '100%';
        default: return '80rem';
      }
    };

    const rootStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: getMaxWidthValue(),
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: padding ? 'var(--pp-space-4)' : '0',
      paddingRight: padding ? 'var(--pp-space-4)' : '0',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={rootStyle}
        className={className}
        data-max-width={maxWidth}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
