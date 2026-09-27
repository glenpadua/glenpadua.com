'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { WorldScene } from '../model/types';
import { DiscoveryMark } from './discovery-mark';
import { WorldDialog } from './world-dialog';

/** Scene-owned words, naturally wrapping paragraphs and optional discoveries. */
export function SceneCopy({
  scene,
  first,
  interactive,
}: {
  scene: WorldScene;
  first: boolean;
  interactive: boolean;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const Heading = first ? 'h1' : 'h2';
  const discovery = scene.discovery;
  return (
    <div className="world-copy">
      {scene.eyebrow && <p className="world-eyebrow">{scene.eyebrow}</p>}
      <Heading id={`${scene.id}-title`}>
        {scene.title.map(line => (
          <span key={line}>{line}</span>
        ))}
      </Heading>
      {scene.body?.map(paragraph => (
        <p className="world-description" key={paragraph}>
          {paragraph}
        </p>
      ))}
      {discovery &&
        ('href' in discovery ? (
          <Link
            className="world-discovery"
            href={discovery.href}
            prefetch={false}
            target={/^https?:\/\//.test(discovery.href) ? '_blank' : undefined}
            rel={
              /^https?:\/\//.test(discovery.href)
                ? 'noopener noreferrer'
                : undefined
            }
          >
            <span>{discovery.label}</span>
            <DiscoveryMark />
          </Link>
        ) : (
          <>
            <button
              className="world-discovery"
              type="button"
              ref={trigger}
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              hidden={!interactive}
            >
              <span>{discovery.label}</span>
              <DiscoveryMark />
            </button>
            <WorldDialog
              open={open}
              onOpenChange={value => {
                setOpen(value);
                if (!value)
                  requestAnimationFrame(() => trigger.current?.focus());
              }}
              title={discovery.title}
            >
              {discovery.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </WorldDialog>
            <noscript>
              <details className="world-discovery-fallback">
                <summary>{discovery.label}</summary>
                {discovery.paragraphs.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </details>
            </noscript>
          </>
        ))}
    </div>
  );
}
