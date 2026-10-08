import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'pill' | 'underline';

export interface TabsProps {
  /** List of tabs with their respective ids and contents */
  tabs: TabItem[];
  /** Default active tab id */
  defaultTabId?: string;
  /** Controlled active tab id */
  activeTabId?: string;
  /** Tab change callback */
  onChange?: (tabId: string) => void;
  /** Visual display style */
  variant?: TabsVariant;
  /** Custom class name */
  className?: string;
  /** Test id for automated visual regression assertions */
  dataTestId?: string;
}

/**
 * Tabs component for switching views between Press Specifications, Inks & Varnishes, and Preflight Checks.
 *
 * Design Tokens Used:
 * - Color: --tab-list-bg, --tab-active-bg, --tab-active-fg, --tab-inactive-fg, --tab-border
 * - Color: --color-accent, --color-bg-primary, --color-bg-secondary
 * - Spacing: --pp-space-1, --pp-space-2, --pp-space-3, --pp-space-4
 * - Radius: --tab-list-radius, --radius-interactive
 * - Typography: --pp-font-size-sm, --font-body
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  activeTabId: controlledActiveId,
  onChange,
  variant = 'pill',
  className = '',
  dataTestId = 'tabs-container',
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultTabId || (tabs[0]?.id ?? '')
  );

  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledActiveId === undefined) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 'var(--pp-space-4)' }}
      className={className}
      data-testid={dataTestId}
    >
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: variant === 'pill' ? 'var(--tab-list-bg)' : 'transparent',
          borderBottom: variant === 'underline' ? '1px solid var(--tab-border)' : 'none',
          padding: variant === 'pill' ? 'var(--pp-space-1)' : '0',
          borderRadius: variant === 'pill' ? 'var(--tab-list-radius)' : '0',
          gap: variant === 'underline' ? 'var(--pp-space-6)' : 'var(--pp-space-1)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          const buttonStyles: React.CSSProperties =
            variant === 'pill'
              ? {
                  padding: 'var(--pp-space-2) var(--pp-space-4)',
                  borderRadius: 'var(--radius-interactive)',
                  fontSize: 'var(--pp-font-size-sm)',
                  fontWeight: 500,
                  backgroundColor: isActive ? 'var(--tab-active-bg)' : 'transparent',
                  color: isActive ? 'var(--tab-active-fg)' : 'var(--tab-inactive-fg)',
                  boxShadow: isActive ? 'var(--pp-shadow-sm)' : 'none',
                  border: 'none',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  opacity: tab.disabled ? 0.4 : 1,
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s ease-in-out',
                }
              : {
                  padding: 'var(--pp-space-3) 0',
                  fontSize: 'var(--pp-font-size-sm)',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: 'transparent',
                  color: isActive ? 'var(--color-accent)' : 'var(--tab-inactive-fg)',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  opacity: tab.disabled ? 0.4 : 1,
                  fontFamily: 'var(--font-body)',
                  marginBottom: '-1px',
                  transition: 'all 0.15s ease-in-out',
                };

          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              style={buttonStyles}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};
