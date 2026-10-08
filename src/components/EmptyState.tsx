import React, { forwardRef } from 'react';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Graphic icon or illustration node */
  icon?: React.ReactNode;
  /** Primary heading */
  title: string;
  /** Supporting descriptive text */
  description?: React.ReactNode;
  /** Action control (e.g. Button) */
  action?: React.ReactNode;
  /** Size scale */
  size?: EmptyStateSize;
}

/**
 * EmptyState component representing empty queues, zero jobs, or recovery action boards.
 *
 * Design Tokens Used:
 * - Color: --emptystate-bg, --emptystate-border, --emptystate-icon-bg, --color-text-primary, --color-text-secondary
 * - Spacing: --pp-space-2, --pp-space-3, --pp-space-4, --pp-space-6, --pp-space-8
 * - Radius: --emptystate-radius, --radius-container, --pp-radius-full
 * - Typography: --font-heading, --pp-font-size-lg, --pp-font-size-base, --pp-font-size-sm
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      size = 'md',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return {
            padding: 'var(--pp-space-4)',
            iconSize: '2.5rem',
            titleSize: 'var(--pp-font-size-base)',
            gap: 'var(--pp-space-2)',
          };
        case 'lg':
          return {
            padding: 'var(--pp-space-10)',
            iconSize: '4.5rem',
            titleSize: 'var(--pp-font-size-2xl)',
            gap: 'var(--pp-space-4)',
          };
        case 'md':
        default:
          return {
            padding: 'var(--pp-space-8)',
            iconSize: '3.5rem',
            titleSize: 'var(--pp-font-size-lg)',
            gap: 'var(--pp-space-3)',
          };
      }
    };

    const s = getSizeStyles();

    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: 'var(--emptystate-bg)',
      border: '1px dashed var(--emptystate-border)',
      borderRadius: 'var(--emptystate-radius)',
      padding: s.padding,
      gap: s.gap,
      width: '100%',
      ...style,
    };

    const iconContainerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.iconSize,
      height: s.iconSize,
      borderRadius: 'var(--pp-radius-full)',
      backgroundColor: 'var(--emptystate-icon-bg)',
      color: 'var(--color-accent)',
      border: '1px solid var(--color-border-subtle)',
    };

    return (
      <div
        ref={ref}
        style={rootStyle}
        className={className}
        data-size={size}
        {...props}
      >
        {icon && <div style={iconContainerStyle}>{icon}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pp-space-1)', maxWidth: '28rem' }}>
          <h4
            style={{
              margin: 0,
              fontSize: s.titleSize,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {title}
          </h4>

          {description && (
            <p
              style={{
                margin: 0,
                fontSize: 'var(--pp-font-size-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                fontFamily: 'var(--font-body)',
              }}
            >
              {description}
            </p>
          )}
        </div>

        {action && (
          <div style={{ marginTop: 'var(--pp-space-2)', display: 'flex', alignItems: 'center', gap: 'var(--pp-space-2)' }}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
