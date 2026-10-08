import React from 'react';
import { Alert } from '../components/Alert';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export interface TimeoutStateProps {
  /** Callback fired when user clicks Retry */
  onRetry?: () => void;
  /** Whether request is retrying */
  isRetrying?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Test identifier */
  dataTestId?: string;
}

/**
 * TimeoutState failure component rendered when proof rendering or plate RIP calculations
 * exceed the gateway timeout threshold.
 *
 * Built strictly with Alert + EmptyState + Button, styled 100% with design tokens.
 */
export const TimeoutState: React.FC<TimeoutStateProps> = ({
  onRetry,
  isRetrying = false,
  className = '',
  dataTestId = 'failure-state-timeout',
}) => {
  const timeoutIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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
        variant="warning"
        title="Request Timed Out"
        message="The Raster Image Processor (RIP) took over 30 seconds to generate the 2400 DPI vector proof. The operation was aborted to prevent queue stalling."
      />

      <EmptyState
        icon={timeoutIcon}
        title="This is taking longer than expected. Try again or come back later."
        description="The printing press queue is experiencing high processing loads. You can retry now or inspect the job status in your dashboard."
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
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </Button>
            <Button variant="secondary" size="md">
              View Queue
            </Button>
          </div>
        }
      />
    </div>
  );
};
