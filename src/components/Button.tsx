import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual hierarchy variant of the button */
  variant?: ButtonVariant;
  /** Size affecting padding, font size, and min-height */
  size?: ButtonSize;
  /** Optional icon to render before children */
  startIcon?: React.ReactNode;
  /** Optional icon to render after children */
  endIcon?: React.ReactNode;
  /** Full-width button spanning 100% of container */
  fullWidth?: boolean;
}

/**
 * Button component for actions, form submissions, and dialog confirmations.
 *
 * Design Tokens Used:
 * - Color: --button-primary-bg, --button-primary-fg, --button-primary-hover
 * - Color: --button-secondary-bg, --button-secondary-fg, --button-secondary-hover
 * - Color: --button-ghost-bg, --button-ghost-fg, --button-ghost-hover
 * - Color: --button-danger-bg, --button-danger-fg, --button-danger-hover
 * - Spacing: --pp-space-2, --pp-space-3, --pp-space-4, --pp-space-5, --pp-space-6
 * - Typography: --pp-font-size-xs, --pp-font-size-sm, --pp-font-size-base, --pp-font-sans
 * - Radius: --button-radius, --radius-interactive
 * - Focus: --color-focus-ring
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      fullWidth = false,
      disabled = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Dynamic styling based on design tokens
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'secondary':
          return {
            backgroundColor: 'var(--button-secondary-bg)',
            color: 'var(--button-secondary-fg)',
            borderColor: 'var(--button-secondary-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'ghost':
          return {
            backgroundColor: 'var(--button-ghost-bg)',
            color: 'var(--button-ghost-fg)',
            borderColor: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'danger':
          return {
            backgroundColor: 'var(--button-danger-bg)',
            color: 'var(--button-danger-fg)',
            borderColor: 'var(--button-danger-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'primary':
        default:
          return {
            backgroundColor: 'var(--button-primary-bg)',
            color: 'var(--button-primary-fg)',
            borderColor: 'var(--button-primary-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
      }
    };

    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            paddingTop: 'var(--pp-space-1)',
            paddingBottom: 'var(--pp-space-1)',
            paddingLeft: 'var(--pp-space-3)',
            paddingRight: 'var(--pp-space-3)',
            fontSize: 'var(--pp-font-size-xs)',
            minHeight: '2rem',
            gap: 'var(--pp-space-1)',
          };
        case 'lg':
          return {
            paddingTop: 'var(--pp-space-3)',
            paddingBottom: 'var(--pp-space-3)',
            paddingLeft: 'var(--pp-space-6)',
            paddingRight: 'var(--pp-space-6)',
            fontSize: 'var(--pp-font-size-base)',
            minHeight: '2.75rem',
            gap: 'var(--pp-space-3)',
          };
        case 'md':
        default:
          return {
            paddingTop: 'var(--pp-space-2)',
            paddingBottom: 'var(--pp-space-2)',
            paddingLeft: 'var(--pp-space-4)',
            paddingRight: 'var(--pp-space-4)',
            fontSize: 'var(--pp-font-size-sm)',
            minHeight: '2.375rem',
            gap: 'var(--pp-space-2)',
          };
      }
    };

    const combinedStyle: React.CSSProperties = {
      display: fullWidth ? 'flex' : 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : 'auto',
      borderRadius: 'var(--button-radius)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--button-font-weight, 600)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.15s ease-in-out',
      outline: 'none',
      userSelect: 'none',
      textDecoration: 'none',
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        style={combinedStyle}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {startIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{startIcon}</span>}
        <span>{children}</span>
        {endIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
