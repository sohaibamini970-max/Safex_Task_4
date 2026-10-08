import React, { forwardRef } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width css value (e.g. 100%, 200px) */
  width?: string | number;
  /** Height css value */
  height?: string | number;
  /** Whether to show active animated shimmer pulse */
  animate?: boolean;
}

/**
 * Skeleton component displaying loading placeholders during print telemetry and order fetching.
 *
 * Design Tokens Used:
 * - Color: --skeleton-bg, --skeleton-shimmer, --color-border-subtle
 * - Radius: --pp-radius-sm, --pp-radius-md, --pp-radius-full
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      animate = true,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getRadius = (): string => {
      switch (variant) {
        case 'circular':
          return 'var(--pp-radius-full)';
        case 'rectangular':
          return 'var(--pp-radius-md)';
        case 'text':
        default:
          return 'var(--pp-radius-sm)';
      }
    };

    const getDefaultDimensions = (): { width: string | number; height: string | number } => {
      switch (variant) {
        case 'circular':
          return { width: width ?? '2.5rem', height: height ?? '2.5rem' };
        case 'rectangular':
          return { width: width ?? '100%', height: height ?? '8rem' };
        case 'text':
        default:
          return { width: width ?? '100%', height: height ?? '1rem' };
      }
    };

    const dimensions = getDefaultDimensions();

    const rootStyle: React.CSSProperties = {
      backgroundColor: 'var(--skeleton-bg)',
      borderRadius: getRadius(),
      width: dimensions.width,
      height: dimensions.height,
      display: 'inline-block',
      position: 'relative',
      overflow: 'hidden',
      opacity: animate ? 0.75 : 0.5,
      animation: animate ? 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
      ...style,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={rootStyle}
        className={className}
        data-variant={variant}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
