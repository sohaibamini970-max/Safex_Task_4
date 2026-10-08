import React, { forwardRef, useId } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Text label displayed above the input field */
  label?: string;
  /** Helpful guidance text displayed below the field */
  hint?: string;
  /** Error message string triggering danger state */
  error?: string;
  /** Input size scale */
  inputSize?: InputSize;
  /** Optional icon prefix inside the field */
  prefixIcon?: React.ReactNode;
  /** Optional suffix element (e.g. unit 'GSM', 'DPI') */
  suffix?: React.ReactNode;
}

/**
 * Input component for press specifications (run size, paper weight, ink density).
 *
 * Design Tokens Used:
 * - Color: --input-bg, --input-fg, --input-border, --input-focus-ring, --input-placeholder
 * - Color: --color-danger, --color-danger-fg, --color-text-muted, --input-disabled-bg
 * - Spacing: --pp-space-1, --pp-space-2, --pp-space-3, --pp-space-4
 * - Radius: --input-radius, --radius-interactive
 * - Typography: --pp-font-size-xs, --pp-font-size-sm, --pp-font-sans
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      inputSize = 'md',
      prefixIcon,
      suffix,
      disabled = false,
      id: customId,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const getSizeStyles = (): { height: string; padding: string; fontSize: string } => {
      switch (inputSize) {
        case 'sm':
          return {
            height: '2rem',
            padding: 'var(--pp-space-1) var(--pp-space-3)',
            fontSize: 'var(--pp-font-size-xs)',
          };
        case 'lg':
          return {
            height: '2.75rem',
            padding: 'var(--pp-space-3) var(--pp-space-4)',
            fontSize: 'var(--pp-font-size-base)',
          };
        case 'md':
        default:
          return {
            height: '2.375rem',
            padding: 'var(--pp-space-2) var(--pp-space-3)',
            fontSize: 'var(--pp-font-size-sm)',
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const hasError = Boolean(error);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pp-space-1)', width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: 'var(--pp-font-size-sm)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {label}
          </label>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            backgroundColor: disabled ? 'var(--input-disabled-bg)' : 'var(--input-bg)',
            border: `1px solid ${hasError ? 'var(--color-danger)' : 'var(--input-border)'}`,
            borderRadius: 'var(--input-radius)',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          {prefixIcon && (
            <span
              style={{
                paddingLeft: 'var(--pp-space-3)',
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              {prefixIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? errorId : hint ? hintId : undefined}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              color: disabled ? 'var(--input-disabled-fg)' : 'var(--input-fg)',
              fontFamily: 'var(--font-body)',
              fontSize: sizeStyles.fontSize,
              height: sizeStyles.height,
              padding: sizeStyles.padding,
              border: 'none',
              outline: 'none',
              cursor: disabled ? 'not-allowed' : 'text',
              ...style,
            }}
            className={`focus:outline-none ${className}`}
            {...props}
          />

          {suffix && (
            <span
              style={{
                paddingRight: 'var(--pp-space-3)',
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--pp-font-size-xs)',
                fontWeight: 500,
              }}
            >
              {suffix}
            </span>
          )}
        </div>

        {error && (
          <span
            id={errorId}
            style={{
              fontSize: 'var(--pp-font-size-xs)',
              color: 'var(--color-danger)',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--pp-space-1)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="7" cy="7" r="5" />
              <line x1="7" y1="4" x2="7" y2="7" />
              <circle cx="7" cy="9.5" r="0.5" fill="currentColor" />
            </svg>
            {error}
          </span>
        )}

        {!error && hint && (
          <span
            id={hintId}
            style={{
              fontSize: 'var(--pp-font-size-xs)',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
