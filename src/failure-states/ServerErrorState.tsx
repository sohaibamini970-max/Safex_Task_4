import React from 'react';
import { Alert } from '../components/Alert';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export interface ServerErrorStateProps {
  /** Callback fired when user clicks Retry */
  onRetry?: () => void;
  /** Whether request is retrying */
  isRetrying?: boolean;
  /** Optional error trace id */
  traceId?: string;
  /** Optional custom class name */
  className?: string;
  /** Test identifier */
  dataTestId?: string;
}

/**
 * ServerErrorState failure component rendered when an internal 500 error occurs
 * on the press workflow orchestration backend.
 *
 * Built strictly with Alert + EmptyState + Button, styled 100% with design tokens.
 */
export const ServerErrorState: React.FC<ServerErrorStateProps> = ({
  onRetry,
  isRetrying = false,
  traceId = 'ERR-500-PRESS-7829',
  className = '',
  dataTestId = 'failure-state-server-error',
}) => {
  const serverErrorIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
      <line x1="14" y1="6" x2="18" y2="6" />
      <line x1="14" y1="18" x2="18" y2="18" />
    </svg>
  );

  return (
    <div
      data-testid={dataTestId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--pp-space-4)',
        width: '100%',
        maxWidth: '36rem',
        margin: '0 auto',
      }}
      className={className}
    >
      <Alert
        variant="error"
        title="500 Internal Press Server Error"
        message={`The press microservice encountered an unhandled exception while formatting the color separation profile. Reference: ${traceId}`}
      />

      <EmptyState
        icon={serverErrorIcon}
        title="Something went wrong on our end. We're working on it."
        description="Our press operations engineering team has been alerted automatically. You can retry the operation or check system incident logs."
        action={
          <div style={{ display: 'flex', gap: 'var(--pp-space-3)' }}>
            <Button
              variant="primary"
              size="md"
              onClick={onRetry}
              disabled={isRetrying}
              startIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              }
            >
              {isRetrying ? 'Retrying...' : 'Retry'}
            </Button>
            <Button variant="ghost" size="md">
              Contact Press Support
            </Button>
          </div>
        }
      />
    </div>
  );
};
