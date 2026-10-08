import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Alert } from '../components/Alert';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Tabs } from '../components/Tabs';
import { Tooltip } from '../components/Tooltip';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { Stack } from '../layouts/Stack';
import { Grid } from '../layouts/Grid';
import { Container } from '../layouts/Container';

import { OfflineState } from '../failure-states/OfflineState';
import { TimeoutState } from '../failure-states/TimeoutState';
import { ServerErrorState } from '../failure-states/ServerErrorState';
import { InvalidDataState } from '../failure-states/InvalidDataState';
import { ExpiredSessionState } from '../failure-states/ExpiredSessionState';

/**
 * Main Interactive Playground Showcase
 * Demonstrates 10 design system components, 3 layout primitives, 5 resilient failure states,
 * and 3 themes (Light, Dark, Brand) strictly styled with design tokens.
 */
export const Playground: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();

  // Modal showcase state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Failure state simulated feedback
  const [retryFeedback, setRetryFeedback] = useState<string | null>(null);

  // Active failure tab showcase
  const [activeFailureKey, setActiveFailureKey] = useState<string>('offline');

  // Input states demo
  const [inputValue, setInputValue] = useState('Letterpress 350 GSM Cotton Stock');

  const triggerFeedback = (msg: string) => {
    setRetryFeedback(msg);
    setTimeout(() => setRetryFeedback(null), 3000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        paddingBottom: 'var(--pp-space-16)',
      }}
      data-testid="playground-root"
    >
      {/* Top Header & Theme Switcher Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-bg-elevated)',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          boxShadow: 'var(--pp-shadow-sm)',
        }}
      >
        <Container maxWidth="2xl">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 'var(--pp-space-4)',
              paddingBottom: 'var(--pp-space-4)',
              flexWrap: 'wrap',
              gap: 'var(--pp-space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pp-space-3)' }}>
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: 'var(--radius-interactive)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-fg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 'var(--pp-font-size-lg)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                HP
              </div>
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 'var(--pp-font-size-lg)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Heritage Press Design System
                </h1>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'var(--pp-font-size-xs)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Regional Printing Press Component Specimen &amp; Token Architecture
                </p>
              </div>
            </div>

            {/* Theme Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--pp-space-2)',
                backgroundColor: 'var(--color-bg-secondary)',
                padding: 'var(--pp-space-1)',
                borderRadius: 'var(--radius-interactive)',
                border: '1px solid var(--color-border-subtle)',
              }}
              data-testid="theme-switcher-group"
            >
              <span
                style={{
                  fontSize: 'var(--pp-font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  paddingLeft: 'var(--pp-space-2)',
                  paddingRight: 'var(--pp-space-1)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Theme:
              </span>
              {themes.map((t) => (
                <button
                  key={t}
                  type="button"
                  data-testid={`theme-button-${t}`}
                  onClick={() => setTheme(t)}
                  style={{
                    padding: 'var(--pp-space-1) var(--pp-space-3)',
                    borderRadius: 'var(--radius-interactive)',
                    fontSize: 'var(--pp-font-size-xs)',
                    fontWeight: theme === t ? 600 : 500,
                    backgroundColor: theme === t ? 'var(--color-accent)' : 'transparent',
                    color: theme === t ? 'var(--color-accent-fg)' : 'var(--color-text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Showcase */}
      <Container maxWidth="2xl" style={{ marginTop: 'var(--pp-space-8)' }}>
        <Stack direction="column" gap="10">

          {/* Section: Overview & Active Theme Details */}
          <Card
            variant="default"
            padding="lg"
            data-testid="overview-card"
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pp-space-2)' }}>
                <span style={{ fontWeight: 600, fontSize: 'var(--pp-font-size-base)' }}>Design Token Environment</span>
                <Badge variant={theme === 'brand' ? 'warning' : theme === 'dark' ? 'info' : 'success'}>
                  Active: {theme.toUpperCase()}
                </Badge>
              </div>
            }
          >
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--pp-font-size-sm)', lineHeight: 1.6 }}>
              This system serves the digital pressroom, prepress telemetry, and proof approval portal of the Heritage Regional Printing Press.
              Themes switch dynamically via <code>data-theme=&quot;{theme}&quot;</code> on <code>&lt;html&gt;</code>, strictly overriding semantic tokens without mutating primitives.
            </p>
          </Card>

          {/* SECTION 1: BUTTONS */}
          <section id="section-buttons" data-testid="section-buttons">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              1. Button Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Supports variants (primary, secondary, ghost, danger) and sizes (sm, md, lg).
            </p>

            <Card padding="md" variant="default">
              <Stack direction="column" gap="4">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pp-space-3)', alignItems: 'center' }}>
                  <Button variant="primary" data-testid="btn-primary-md">
                    Primary Press Proof
                  </Button>
                  <Button variant="secondary" data-testid="btn-secondary-md">
                    Secondary Spec
                  </Button>
                  <Button variant="ghost" data-testid="btn-ghost-md">
                    Ghost Action
                  </Button>
                  <Button variant="danger" data-testid="btn-danger-md">
                    Cancel Plate Run
                  </Button>
                  <Button variant="primary" disabled data-testid="btn-disabled">
                    Disabled State
                  </Button>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--pp-space-4)', display: 'flex', flexWrap: 'wrap', gap: 'var(--pp-space-3)', alignItems: 'center' }}>
                  <Button variant="primary" size="sm" data-testid="btn-sm">
                    Small (sm)
                  </Button>
                  <Button variant="primary" size="md" data-testid="btn-md">
                    Medium (md)
                  </Button>
                  <Button variant="primary" size="lg" data-testid="btn-lg">
                    Large Run (lg)
                  </Button>
                </div>
              </Stack>
            </Card>
          </section>

          {/* SECTION 2: CARDS */}
          <section id="section-cards" data-testid="section-cards">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              2. Card Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Available in default, elevated, and outlined variants with optional header and footer slots.
            </p>

            <Grid cols={3} gap="4" minColWidth="260px">
              <Card
                variant="default"
                data-testid="card-variant-default"
                header={<strong style={{ fontSize: 'var(--pp-font-size-sm)' }}>Default Flat Card</strong>}
                footer={<Button size="sm" variant="ghost">Inspect</Button>}
              >
                <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  Standard letterpress work ticket surface with subtle 1px border.
                </p>
              </Card>

              <Card
                variant="elevated"
                data-testid="card-variant-elevated"
                header={<strong style={{ fontSize: 'var(--pp-font-size-sm)' }}>Elevated Sheet Card</strong>}
                footer={<Button size="sm" variant="primary">Approve</Button>}
              >
                <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  Lifted card with token shadow, representing active press platen.
                </p>
              </Card>

              <Card
                variant="outlined"
                data-testid="card-variant-outlined"
                header={<strong style={{ fontSize: 'var(--pp-font-size-sm)' }}>Outlined Card</strong>}
                footer={<Button size="sm" variant="secondary">Archive</Button>}
              >
                <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  Strong border boundary for archival records and inventory batches.
                </p>
              </Card>
            </Grid>
          </section>

          {/* SECTION 3: BADGES */}
          <section id="section-badges" data-testid="section-badges">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              3. Badge Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Status badges for press job workflows, inks, and inspection milestones.
            </p>

            <Card padding="md" variant="default">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pp-space-3)', alignItems: 'center' }}>
                <Badge variant="neutral" data-testid="badge-neutral">Neutral: Draft Spec</Badge>
                <Badge variant="info" data-testid="badge-info">Info: Inking In Progress</Badge>
                <Badge variant="success" data-testid="badge-success">Success: Proof Approved</Badge>
                <Badge variant="warning" data-testid="badge-warning">Warning: Low Cyan Ink</Badge>
                <Badge variant="danger" data-testid="badge-danger">Danger: Plate Jam</Badge>
              </div>
            </Card>
          </section>

          {/* SECTION 4: ALERTS */}
          <section id="section-alerts" data-testid="section-alerts">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              4. Alert Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Inline notification banners in info, success, warning, and error severity variants.
            </p>

            <Stack direction="column" gap="3">
              <Alert
                variant="info"
                title="Press Calibration Scheduled"
                message="Heidelberg Speedmaster XL 106 will pause at 14:00 for color densitometer recalibration."
                data-testid="alert-info"
              />
              <Alert
                variant="success"
                title="Job No. 8921 Passed Preflight"
                message="Vector traps, 3mm bleed margins, and spot varnish plates successfully verified."
                data-testid="alert-success"
              />
              <Alert
                variant="warning"
                title="Paper Humidity Warning"
                message="Paper storage hygrometer reads 32% relative humidity. Static electricity risk elevated."
                data-testid="alert-warning"
              />
              <Alert
                variant="error"
                title="Cyan Fountain Roller Error"
                message="Sensor indicates insufficient roller pressure on Unit 2. Production stopped."
                data-testid="alert-error"
              />
            </Stack>
          </section>

          {/* SECTION 5: INPUT */}
          <section id="section-inputs" data-testid="section-inputs">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              5. Input Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Form field primitives with label, hint, error validation, and disabled states.
            </p>

            <Grid cols={3} gap="4" minColWidth="260px">
              <Card padding="md">
                <Input
                  label="Paper Stock Selection"
                  hint="Specify mill name and grain orientation"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  suffix="GSM"
                  data-testid="input-normal"
                />
              </Card>

              <Card padding="md">
                <Input
                  label="Job Quantity (Impression Count)"
                  error="Minimum offset press run is 500 sheets"
                  defaultValue="120"
                  suffix="Sheets"
                  data-testid="input-error"
                />
              </Card>

              <Card padding="md">
                <Input
                  label="Plate Cylinder Pressure (Locked)"
                  hint="Configured by Master Press Operator"
                  defaultValue="0.14 mm"
                  disabled
                  data-testid="input-disabled"
                />
              </Card>
            </Grid>
          </section>

          {/* SECTION 6: MODAL */}
          <section id="section-modal" data-testid="section-modal">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              6. Modal Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Overlay dialog for critical approvals, plate releases, and machine stop confirmations.
            </p>

            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pp-space-4)' }}>
                <Button
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                  data-testid="open-modal-trigger"
                >
                  Open Print Approval Dialog
                </Button>
                <span style={{ fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  State: {isModalOpen ? 'Active modal open' : 'Closed'}
                </span>
              </div>
            </Card>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Confirm Plate Release to Press Unit 1"
              dataTestId="playground-modal-specimen"
              footer={
                <>
                  <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                    Confirm &amp; Run
                  </Button>
                </>
              }
            >
              <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                You are about to authorize the offset cylinder run of <strong>10,000 sheets</strong> on Somerset 300 GSM Velvet.
                Ensure ink viscosity and fountain water conductivity tests have been recorded in the shift binder.
              </p>
            </Modal>
          </section>

          {/* SECTION 7: TABS */}
          <section id="section-tabs" data-testid="section-tabs">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              7. Tabs Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Tabbed navigation for switching press work stations and technical configurations.
            </p>

            <Card padding="md">
              <Tabs
                dataTestId="specimen-tabs"
                tabs={[
                  {
                    id: 'specs',
                    label: 'Press Specs',
                    content: (
                      <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        Cylinder Velocity: 14,000 sheets/hour. Substrate: 300 GSM Crane Lettra. Bleed: 3.175mm.
                      </p>
                    ),
                  },
                  {
                    id: 'inks',
                    label: 'Inks & Varnishes',
                    content: (
                      <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        Pantone 186 C (Vermilion), Pantone Reflex Blue C, Matte Aqueous Coating.
                      </p>
                    ),
                  },
                  {
                    id: 'binding',
                    label: 'Bindery & Finishing',
                    content: (
                      <p style={{ margin: 0, fontSize: 'var(--pp-font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        Letterpress blind deboss, gilded edges, hand saddle-stitched with waxed linen thread.
                      </p>
                    ),
                  },
                ]}
              />
            </Card>
          </section>

          {/* SECTION 8: TOOLTIP */}
          <section id="section-tooltip" data-testid="section-tooltip">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              8. Tooltip Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Contextual guidance explaining technical typography and printing jargon.
            </p>

            <Card padding="md">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pp-space-6)', alignItems: 'center' }}>
                <Tooltip content="Raster Image Processor rendering resolution" position="top">
                  <Button variant="secondary" size="sm" data-testid="tooltip-trigger-top">
                    Hover: 2400 DPI RIP
                  </Button>
                </Tooltip>

                <Tooltip content="Cyan, Magenta, Yellow, Key (Black) four-color printing process" position="bottom">
                  <Button variant="secondary" size="sm" data-testid="tooltip-trigger-bottom">
                    Hover: CMYK Separation
                  </Button>
                </Tooltip>

                <Tooltip content="Grammage: weight of paper stock in grams per square meter" position="right">
                  <Button variant="secondary" size="sm" data-testid="tooltip-trigger-right">
                    Hover: 350 GSM
                  </Button>
                </Tooltip>
              </div>
            </Card>
          </section>

          {/* SECTION 9: SKELETON */}
          <section id="section-skeleton" data-testid="section-skeleton">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              9. Skeleton Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Shimmer loading states for real-time telemetry updates and asynchronous catalog fetches.
            </p>

            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pp-space-4)', marginBottom: 'var(--pp-space-4)' }}>
                <Skeleton variant="circular" width="3rem" height="3rem" data-testid="skeleton-circular" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--pp-space-2)' }}>
                  <Skeleton variant="text" width="60%" height="1.25rem" data-testid="skeleton-text" />
                  <Skeleton variant="text" width="40%" height="0.875rem" />
                </div>
              </div>
              <Skeleton variant="rectangular" height="6rem" data-testid="skeleton-rectangular" />
            </Card>
          </section>

          {/* SECTION 10: EMPTY STATE */}
          <section id="section-empty-state" data-testid="section-empty-state">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              10. EmptyState Component
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Visual placeholder for clear queues, zero backlogs, or fresh production batches.
            </p>

            <EmptyState
              data-testid="specimen-empty-state"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              }
              title="No Pending Print Proofs"
              description="All proofing runs for Shift A have been stamped and transferred to bindery finishing."
              action={<Button variant="primary" size="md">Queue New Run</Button>}
            />
          </section>

          {/* SECTION: 5 FAILURE STATES (SPECIAL CONSTRAINT) */}
          <section id="section-failure-states" data-testid="section-failure-states">
            <div style={{ borderTop: '2px solid var(--color-border-subtle)', paddingTop: 'var(--pp-space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--pp-space-2)', marginBottom: 'var(--pp-space-4)' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', margin: 0 }}>
                    Resilient Failure States (5 Critical Cases)
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', margin: 'var(--pp-space-1) 0 0 0', fontSize: 'var(--pp-font-size-sm)' }}>
                    Visual recovery workflows styled entirely with design tokens, combining Alert, EmptyState, and Button.
                  </p>
                </div>

                {/* Failure State Tab Switcher */}
                <div style={{ display: 'flex', gap: 'var(--pp-space-1)', flexWrap: 'wrap' }}>
                  {[
                    { key: 'offline', label: '1. Offline' },
                    { key: 'timeout', label: '2. Timeout' },
                    { key: 'server-error', label: '3. 500 Error' },
                    { key: 'invalid-data', label: '4. Invalid Data' },
                    { key: 'expired-session', label: '5. Expired Session' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      data-testid={`failure-tab-${item.key}`}
                      onClick={() => setActiveFailureKey(item.key)}
                      style={{
                        padding: 'var(--pp-space-1) var(--pp-space-3)',
                        borderRadius: 'var(--radius-interactive)',
                        fontSize: 'var(--pp-font-size-xs)',
                        fontWeight: activeFailureKey === item.key ? 600 : 500,
                        backgroundColor: activeFailureKey === item.key ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                        color: activeFailureKey === item.key ? 'var(--color-accent-fg)' : 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {retryFeedback && (
                <div style={{ marginBottom: 'var(--pp-space-4)' }}>
                  <Alert variant="info" title="Recovery Action Dispatched" message={retryFeedback} />
                </div>
              )}

              {/* Render Active Failure Case Demo */}
              <Card padding="lg" variant="default" data-testid="failure-state-active-container">
                {activeFailureKey === 'offline' && (
                  <OfflineState onRetry={() => triggerFeedback('Reconnection handshake sent to local spooler.')} />
                )}
                {activeFailureKey === 'timeout' && (
                  <TimeoutState onRetry={() => triggerFeedback('RIP worker timeout reset. Retrying raster job.')} />
                )}
                {activeFailureKey === 'server-error' && (
                  <ServerErrorState onRetry={() => triggerFeedback('Retrying API request with exponential backoff.')} />
                )}
                {activeFailureKey === 'invalid-data' && (
                  <InvalidDataState onRefresh={() => triggerFeedback('Preflight schema refresh initiated.')} />
                )}
                {activeFailureKey === 'expired-session' && (
                  <ExpiredSessionState onSignIn={() => triggerFeedback('Redirecting operator to SSO authentication.')} />
                )}
              </Card>
            </div>
          </section>

          {/* SECTION: RESPONSIVE LAYOUT PRIMITIVES */}
          <section id="section-layouts" data-testid="section-layouts">
            <h2 style={{ fontSize: 'var(--pp-font-size-2xl)', marginBottom: 'var(--pp-space-2)' }}>
              Layout Primitives (Stack, Grid, Container)
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--pp-space-4)', fontSize: 'var(--pp-font-size-sm)' }}>
              Composing complex press interfaces purely through tokenized spacing scales.
            </p>

            <Grid cols={2} gap="4" minColWidth="300px">
              <Card padding="md" header={<strong>Stack (Vertical Flow)</strong>}>
                <Stack direction="column" gap="2" data-testid="stack-specimen">
                  <div style={{ padding: 'var(--pp-space-2)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-interactive)', fontSize: 'var(--pp-font-size-xs)' }}>
                    Item 1: Ink Fountain Level
                  </div>
                  <div style={{ padding: 'var(--pp-space-2)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-interactive)', fontSize: 'var(--pp-font-size-xs)' }}>
                    Item 2: Sheet Registration Sensor
                  </div>
                  <div style={{ padding: 'var(--pp-space-2)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-interactive)', fontSize: 'var(--pp-font-size-xs)' }}>
                    Item 3: Blanket Cylinder Dryer
                  </div>
                </Stack>
              </Card>

              <Card padding="md" header={<strong>Grid (Responsive 3-Column)</strong>}>
                <Grid cols={3} gap="2" data-testid="grid-specimen">
                  <div style={{ padding: 'var(--pp-space-2)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-interactive)', fontSize: 'var(--pp-font-size-xs)', textAlign: 'center' }}>
                    Plate A
                  </div>
                  <div style={{ padding: 'var(--pp-space-2)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-interactive)', fontSize: 'var(--pp-font-size-xs)', textAlign: 'center' }}>
                    Plate B
                  </div>
                  <div style={{ padding: 'var(--pp-space-2)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-interactive)', fontSize: 'var(--pp-font-size-xs)', textAlign: 'center' }}>
                    Plate C
                  </div>
                </Grid>
              </Card>
            </Grid>
          </section>

        </Stack>
      </Container>
    </div>
  );
};
