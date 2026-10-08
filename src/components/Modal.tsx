import React, { useEffect, useRef } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Visibility state */
  isOpen: boolean;
  /** Callback to close the modal dialog */
  onClose: () => void;
  /** Modal header title */
  title?: React.ReactNode;
  /** Modal body content */
  children: React.ReactNode;
  /** Modal footer action controls */
  footer?: React.ReactNode;
  /** Width size scale */
  size?: ModalSize;
  /** Optional custom class name */
  className?: string;
  /** Data test id for visual regression test targeting */
  dataTestId?: string;
}

/**
 * Modal dialog for print job configurations, dangerous plates cancellation, and proofs approval.
 *
 * Design Tokens Used:
 * - Color: --modal-bg, --modal-overlay, --modal-border, --color-text-primary, --color-text-secondary
 * - Spacing: --pp-space-3, --pp-space-4, --pp-space-6
 * - Radius: --modal-radius, --radius-container
 * - Shadow: --modal-shadow, --pp-shadow-xl
 * - Typography: --font-heading, --pp-font-size-lg
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
  dataTestId = 'modal-dialog',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getMaxWidth = () => {
    switch (size) {
      case 'sm':
        return '24rem';
      case 'lg':
        return '40rem';
      case 'xl':
        return '54rem';
      case 'md':
      default:
        return '32rem';
    }
  };

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--modal-overlay)',
        padding: 'var(--pp-space-4)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        data-testid={dataTestId}
        style={{
          width: '100%',
          maxWidth: getMaxWidth(),
          backgroundColor: 'var(--modal-bg)',
          borderRadius: 'var(--modal-radius)',
          border: '1px solid var(--modal-border)',
          boxShadow: 'var(--modal-shadow)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden',
        }}
        className={className}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--pp-space-4) var(--pp-space-6)',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {title && (
            <h3
              id="modal-title"
              style={{
                margin: 0,
                fontSize: 'var(--pp-font-size-lg)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {title}
            </h3>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            data-testid="modal-close-button"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: 'var(--pp-space-1)',
              borderRadius: 'var(--radius-interactive)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5L15 15M15 5L5 15" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: 'var(--pp-space-6)',
            overflowY: 'auto',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: 'var(--pp-space-4) var(--pp-space-6)',
              borderTop: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 'var(--pp-space-3)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
