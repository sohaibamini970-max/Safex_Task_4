import React from 'react';
import { Alert } from '../components/Alert';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export interface OfflineStateProps {
  /** Callback fired when user clicks Retry */
  onRetry?: () => void;
  /** Whether a reconnection retry is actively running */
  isRetrying?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Optional custom test identifier */
  dataTestId?: string;
}

/**
 * OfflineState failure component rendered when the client loses network connection
 * to the press shop production telemetry queue.
 *
 * Built strictly with Alert + EmptyState + Button, styled 100% with design tokens.
 */
export const OfflineState: React.FC<OfflineStateProps> = ({
  onRetry,
  isRetrying = false,
  className = '',
  dataTestId = 'failure-state-offline',
}) => {
  const offlineIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
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
        title="Network Connection Lost"
        message="Local print spooler paused. Changes are saved locally and will sync once internet connection is restored."
      />

      <EmptyState
        icon={offlineIcon}
        title="You're offline. Check your connection and try again."
        description="We couldn't connect to the Heidelberg print server. Please check your Wi-Fi, Ethernet cable, or local network router."
        action={
          <Button
            variant="primary"
            size="md"
            onClick={onRetry}
            disabled={isRetrying}
            startIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            }
          >
            {isRetrying ? 'Reconnecting...' : 'Retry Connection'}
          </Button>
        }
      />
    </div>
  );
};
