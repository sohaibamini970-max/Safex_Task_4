import React, { forwardRef } from 'react';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual status variant */
  variant?: BadgeVariant;
  /** Size scale */
  size?: BadgeSize;
  /** Optional icon prefix */
  icon?: React.ReactNode;
}

/**
 * Badge component for tags, job order statuses, proof approvals, and inventory counts.
 *
 * Design Tokens Used:
 * - Color: --badge-neutral-bg, --badge-neutral-fg, --badge-neutral-border
 * - Color: --badge-info-bg, --badge-info-fg, --badge-info-border
 * - Color: --badge-success-bg, --badge-success-fg, --badge-success-border
 * - Color: --badge-warning-bg, --badge-warning-fg, --badge-warning-border
 * - Color: --badge-danger-bg, --badge-danger-fg, --badge-danger-border
 * - Radius: --badge-radius, --pp-radius-full
 * - Typography: --pp-font-size-xs, --pp-font-size-sm, --pp-font-mono
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'neutral',
      size = 'md',
      icon,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'info':
          return {
            backgroundColor: 'var(--badge-info-bg)',
            color: 'var(--badge-info-fg)',
            borderColor: 'var(--badge-info-border)',
          };
        case 'success':
          return {
            backgroundColor: 'var(--badge-success-bg)',
            color: 'var(--badge-success-fg)',
            borderColor: 'var(--badge-success-border)',
          };
        case 'warning':
          return {
            backgroundColor: 'var(--badge-warning-bg)',
            color: 'var(--badge-warning-fg)',
            borderColor: 'var(--badge-warning-border)',
          };
        case 'danger':
          return {
            backgroundColor: 'var(--badge-danger-bg)',
            color: 'var(--badge-danger-fg)',
            borderColor: 'var(--badge-danger-border)',
          };
        case 'neutral':
        default:
          return {
            backgroundColor: 'var(--badge-neutral-bg)',
            color: 'var(--badge-neutral-fg)',
            borderColor: 'var(--badge-neutral-border)',
          };
      }
    };

    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            padding: 'var(--pp-space-1) var(--pp-space-2)',
            fontSize: 'var(--pp-font-size-xs)',
            gap: 'var(--pp-space-1)',
          };
        case 'lg':
          return {
            padding: 'var(--pp-space-2) var(--pp-space-4)',
            fontSize: 'var(--pp-font-size-sm)',
            gap: 'var(--pp-space-2)',
          };
        case 'md':
        default:
          return {
            padding: '0.125rem var(--pp-space-3)',
            fontSize: 'var(--pp-font-size-xs)',
            gap: 'var(--pp-space-1)',
          };
      }
    };

    const rootStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--badge-radius)',
      borderWidth: '1px',
      borderStyle: 'solid',
      fontWeight: 'var(--badge-font-weight, 500)',
      fontFamily: 'var(--font-body)',
      lineHeight: '1.2',
      whiteSpace: 'nowrap',
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...style,
    };

    return (
      <span
        ref={ref}
        style={rootStyle}
        className={className}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
