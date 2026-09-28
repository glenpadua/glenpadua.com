'use client';
import Link from 'next/link';
import { CueLight } from './cue-light';
import type {
  AriaAttributes,
  CSSProperties,
  MouseEventHandler,
  ReactNode,
} from 'react';

interface OrbBase {
  label: string;
  hint?: string;
  className?: string;
  style?: CSSProperties;
  /** An object-shaped marker can replace the glint without duplicating link UX. */
  marker?: ReactNode;
}
type OrbProps = OrbBase &
  (
    | {
        href: string;
        onClick?: never;
        pressed?: never;
        disabled?: never;
        hasPopup?: never;
      }
    | {
        href?: never;
        onClick: MouseEventHandler<HTMLButtonElement>;
        pressed?: boolean;
        disabled?: boolean;
        hasPopup?: AriaAttributes['aria-haspopup'];
      }
  );

/** One discovery control: a ring of light, real link/button, label on hover or focus. */
export function InteractionOrb(props: OrbProps): JSX.Element {
  const shared = {
    className: `world-cue ${props.className ?? ''}`,
    style: props.style,
    'aria-label': props.label,
  };
  const contents = (
    <>
      {props.marker ?? <CueLight />}
      <span className="world-cue-label" aria-hidden="true">
        {props.hint ?? props.label}
      </span>
    </>
  );
  if (props.href !== undefined) {
    const external = /^https?:\/\//.test(props.href);
    return (
      <Link
        {...shared}
        href={props.href}
        prefetch={false}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {contents}
      </Link>
    );
  }
  return (
    <button
      {...shared}
      type="button"
      onClick={props.onClick}
      aria-pressed={props.pressed}
      aria-haspopup={props.hasPopup}
      disabled={props.disabled}
    >
      {contents}
    </button>
  );
}
