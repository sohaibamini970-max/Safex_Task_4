import React, { forwardRef } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Severity variant */
  variant?: AlertVariant;
  /** Bold prominent heading */
  title?: string;
  /** Primary message description (can be passed as children too) */
  message?: React.ReactNode;
  /** Custom icon override or null to hide icon */
  icon?: React.ReactNode;
  /** Action node (e.g. retry button, dismiss link) */
  action?: React.ReactNode;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

/**
 * Alert component displaying status notices, network states, and press error conditions.
 *
 * Design Tokens Used:
 * - Color: --alert-info-bg, --alert-info-border, --alert-info-text, --alert-info-icon
 * - Color: --alert-success-bg, --alert-success-border, --alert-success-text, --alert-success-icon
 * - Color: --alert-warning-bg, --alert-warning-border, --alert-warning-text, --alert-warning-icon
 * - Color: --alert-error-bg, --alert-error-border, --alert-error-text, --alert-error-icon
 * - Spacing: --alert-padding, --pp-space-2, --pp-space-3, --pp-space-4
 * - Radius: --alert-radius, --radius-container
 * - Typography: --pp-font-size-sm, --pp-font-size-base
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      message,
      icon,
      action,
      onClose,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getVariantTokens = () => {
      switch (variant) {
        case 'success':
          return {
            bg: 'var(--alert-success-bg)',
            border: 'var(--alert-success-border)',
            text: 'var(--alert-success-text)',
            iconColor: 'var(--alert-success-icon)',
          };
        case 'warning':
          return {
            bg: 'var(--alert-warning-bg)',
            border: 'var(--alert-warning-border)',
            text: 'var(--alert-warning-text)',
            iconColor: 'var(--alert-warning-icon)',
          };
        case 'error':
          return {
            bg: 'var(--alert-error-bg)',
            border: 'var(--alert-error-border)',
            text: 'var(--alert-error-text)',
            iconColor: 'var(--alert-error-icon)',
          };
        case 'info':
        default:
          return {
            bg: 'var(--alert-info-bg)',
            border: 'var(--alert-info-border)',
            text: 'var(--alert-info-text)',
            iconColor: 'var(--alert-info-icon)',
          };
      }
    };

    const tokens = getVariantTokens();

    const getDefaultIcon = () => {
      switch (variant) {
        case 'success':
          return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 6L8.5 13.5L4 9" />
            </svg>
          );
        case 'warning':
          return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2L2 17H18L10 2Z" />
              <line x1="10" y1="8" x2="10" y2="12" />
              <line x1="10" y1="14" x2="10.01" y2="14" />
            </svg>
          );
        case 'error':
          return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="8" />
              <line x1="10" y1="6" x2="10" y2="10" />
              <line x1="10" y1="14" x2="10.01" y2="14" />
            </svg>
          );
        case 'info':
        default:
          return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="8" />
              <line x1="10" y1="10" x2="10" y2="15" />
              <line x1="10" y1="6" x2="10.01" y2="6" />
            </svg>
          );
      }
    };

    const rootStyle: React.CSSProperties = {
      backgroundColor: tokens.bg,
      border: `1px solid ${tokens.border}`,
      color: tokens.text,
      borderRadius: 'var(--alert-radius)',
      padding: 'var(--alert-padding)',
      display: 'flex',
      gap: 'var(--pp-space-3)',
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)',
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      color: tokens.iconColor,
      flexShrink: 0,
      marginTop: '0.125rem',
      display: 'inline-flex',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--pp-space-1)',
    };

    return (
      <div
        ref={ref}
        role="alert"
        style={rootStyle}
        className={className}
        data-variant={variant}
        {...props}
      >
        {icon !== null && (
          <div style={iconStyle}>
            {icon || getDefaultIcon()}
          </div>
        )}

        <div style={contentStyle}>
          {title && (
            <div style={{ fontWeight: 600, fontSize: 'var(--pp-font-size-sm)', lineHeight: 1.3 }}>
              {title}
            </div>
          )}
          <div style={{ fontSize: 'var(--pp-font-size-sm)', lineHeight: 1.45, opacity: 0.9 }}>
            {message || children}
          </div>
          {action && (
            <div style={{ marginTop: 'var(--pp-space-2)', display: 'flex', alignItems: 'center', gap: 'var(--pp-space-2)' }}>
              {action}
            </div>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss alert"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'currentColor',
              opacity: 0.6,
              padding: 'var(--pp-space-1)',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4L12 12M12 4L4 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
