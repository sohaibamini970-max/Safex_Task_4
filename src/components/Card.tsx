import React, { forwardRef } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional header node rendered at the top */
  header?: React.ReactNode;
  /** Optional footer node rendered at the bottom */
  footer?: React.ReactNode;
  /** Visual surface variant */
  variant?: CardVariant;
  /** Inner content padding scale */
  padding?: CardPadding;
}

/**
 * Card component providing grouped surface container for content, forms, and press metrics.
 *
 * Design Tokens Used:
 * - Color: --card-bg, --card-border, --color-bg-primary, --color-bg-secondary, --color-border-subtle
 * - Spacing: --card-padding, --pp-space-3, --pp-space-4, --pp-space-6, --pp-space-8
 * - Radius: --card-radius, --radius-container
 * - Shadow: --card-shadow, --pp-shadow-sm, --pp-shadow-md
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      header,
      footer,
      variant = 'default',
      padding = 'md',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getPaddingValue = (): string => {
      switch (padding) {
        case 'none':
          return '0';
        case 'sm':
          return 'var(--pp-space-3)';
        case 'lg':
          return 'var(--pp-space-8)';
        case 'md':
        default:
          return 'var(--card-padding)';
      }
    };

    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'elevated':
          return {
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--card-shadow)',
          };
        case 'outlined':
          return {
            backgroundColor: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-strong)',
            boxShadow: 'none',
          };
        case 'default':
        default:
          return {
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--pp-shadow-sm)',
          };
      }
    };

    const paddingVal = getPaddingValue();

    const rootStyle: React.CSSProperties = {
      borderRadius: 'var(--card-radius)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      ...getVariantStyles(),
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      padding: paddingVal !== '0' ? `${paddingVal} ${paddingVal} var(--pp-space-3)` : '0',
      borderBottom: '1px solid var(--color-border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const bodyStyle: React.CSSProperties = {
      padding: paddingVal,
      flex: 1,
    };

    const footerStyle: React.CSSProperties = {
      padding: paddingVal !== '0' ? `var(--pp-space-3) ${paddingVal} ${paddingVal}` : '0',
      borderTop: '1px solid var(--color-border-subtle)',
      backgroundColor: 'var(--color-bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 'var(--pp-space-3)',
    };

    return (
      <div
        ref={ref}
        style={rootStyle}
        className={className}
        data-variant={variant}
        data-padding={padding}
        {...props}
      >
        {header && <div style={headerStyle}>{header}</div>}
        <div style={bodyStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';
