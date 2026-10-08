import React from 'react';
import { Alert } from '../components/Alert';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export interface ExpiredSessionStateProps {
  /** Callback fired when user clicks Sign In */
  onSignIn?: () => void;
  /** Optional custom class name */
  className?: string;
  /** Test identifier */
  dataTestId?: string;
}

/**
 * ExpiredSessionState failure component rendered when the press operator's
 * security token or bearer authorization expires during active queue management.
 *
 * Built strictly with Alert + EmptyState + Button, styled 100% with design tokens.
 */
export const ExpiredSessionState: React.FC<ExpiredSessionStateProps> = ({
  onSignIn,
  className = '',
  dataTestId = 'failure-state-expired-session',
}) => {
  const lockIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
        variant="info"
        title="Session Security Lock"
        message="For press safety and audit compliance, operator access tokens automatically expire after 15 minutes of idle workstation time."
      />

      <EmptyState
        icon={lockIcon}
        title="Your session expired. Please sign in again."
        description="Your pending print proof edits have been saved to local draft storage. Authenticate with your operator badge or SSO credentials to proceed."
        action={
          <div style={{ display: 'flex', gap: 'var(--pp-space-3)' }}>
            <Button
              variant="primary"
              size="md"
              onClick={onSignIn}
              startIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              }
            >
              Sign In Again
            </Button>
            <Button variant="ghost" size="md">
              Switch Operator
            </Button>
          </div>
        }
      />
    </div>
  );
};
