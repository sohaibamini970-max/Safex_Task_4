import React from 'react';
import { Alert } from '../components/Alert';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export interface InvalidDataStateProps {
  /** Callback fired when user clicks Refresh */
  onRefresh?: () => void;
  /** Optional custom class name */
  className?: string;
  /** Test identifier */
  dataTestId?: string;
}

/**
 * InvalidDataState failure component rendered when PDF preflight files contain
 * unreadable color spaces, missing embedded font tables, or corrupt metadata.
 *
 * Built strictly with Alert + EmptyState + Button, styled 100% with design tokens.
 */
export const InvalidDataState: React.FC<InvalidDataStateProps> = ({
  onRefresh,
  className = '',
  dataTestId = 'failure-state-invalid-data',
}) => {
  const fileWarningIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <line x1="12" y1="12" x2="12" y2="15" />
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
        title="Corrupted Preflight Data Structure"
        message="The response payload from the press catalog is missing essential schema fields: missing `paperStockId`, invalid `bleedMargin` format."
      />

      <EmptyState
        icon={fileWarningIcon}
        title="We couldn't read this data. Please refresh or contact support."
        description="The data payload returned from the press server could not be validated against the PrintXML schema. Please reload the specification."
        action={
          <div style={{ display: 'flex', gap: 'var(--pp-space-3)' }}>
            <Button
              variant="primary"
              size="md"
              onClick={onRefresh}
              startIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              }
            >
              Refresh Data
            </Button>
            <Button variant="secondary" size="md">
              Download Diagnostic Log
            </Button>
          </div>
        }
      />
    </div>
  );
};
