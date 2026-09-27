'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { worldAsset } from '../../lib/assets';
import { articleHref, worldRoutes } from '../../lib/routes';
import { weddingWebsite, type DeskProject } from './content';
import { WorldDialog } from '@/features/diorama/shared/world-dialog';
import { InteractionOrb } from '../../shared/interaction-orb';
import { TypingHands } from './typing-hands';
import { SlackProfile } from './slack-profile';
import { WeddingFrame } from './wedding-frame';
import { CoffeeSteam } from './coffee-steam';
import { SpinningGlobe } from './spinning-globe';

export function WorkRoom({
  projects,
}: {
  projects: readonly DeskProject[];
}): JSX.Element {
  const [index, setIndex] = useState(0);
  const [panel, setPanel] = useState<'project' | 'remote' | null>(null);
  const [light, setLight] = useState(true);
  const [screenAsleep, setScreenAsleep] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const project = projects[index];
  const open = (name: typeof panel) => {
    opener.current = document.activeElement as HTMLElement;
    setPanel(name);
  };
  const close = (value: boolean) => {
    if (!value) {
      setPanel(null);
      requestAnimationFrame(() => opener.current?.focus());
    }
  };
  return (
    <main
      id="world-main"
      tabIndex={-1}
      className="world-room work-room"
      data-lamp={light}
      data-screen-asleep={screenAsleep}
    >
      <h1 className="sr-only">Work — Glen’s desk</h1>
      <div className="room-art-stage">
        <picture>
          <source
            media="(max-width:760px)"
            srcSet={worldAsset('work-globe-room-portrait')}
          />
          <source
            srcSet={`${worldAsset('work-globe-room-900')} 900w, ${worldAsset('work-globe-room')} 1536w`}
            sizes="100vw"
          />
          <img
            className="room-art"
            src={worldAsset('work-globe-room')}
            width={1536}
            height={1024}
            alt="Looking over the back of Glen’s head as he works at a bedroom desk. Main monitor ahead, a laptop to the left and a globe to the right. An Arsenal scarf hangs over the desk."
            fetchPriority="high"
          />
        </picture>
        <WeddingFrame />
        <TypingHands />
        <SpinningGlobe />
        <div className="room-light" aria-hidden="true" />
        <CoffeeSteam />
        <span className="room-window-glow" aria-hidden="true" />
        <section
          className="desk-monitor"
          aria-label="Projects"
          aria-roledescription="carousel"
        >
          {screenAsleep ? (
            <div className="screen-saver">
              <svg viewBox="0 0 100 70" aria-hidden="true">
                <circle cx="50" cy="35" r="19" fill="#54765d" />
                <g className="screen-saver-orbit">
                  <circle cx="82" cy="35" r="3" fill="#ca9b63" />
                  <ellipse
                    cx="50"
                    cy="35"
                    rx="33"
                    ry="25"
                    fill="none"
                    stroke="#54765d4d"
                  />
                </g>
              </svg>
              <p>Gone for a walk.</p>
              <button onClick={() => setScreenAsleep(false)}>
                Back to the desk ↗
              </button>
            </div>
          ) : (
            <>
              <div className="monitor-top">
                <span>
                  <i /> On my desk
                </span>
                <span>
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <div
                className="monitor-project"
                key={project.id}
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="world-eyebrow">{project.status}</p>
                <h2>{project.name}</h2>
                <p className="monitor-teaser">{project.teaser}</p>
              </div>
              <div className="monitor-actions">
                <button
                  className="monitor-open"
                  onClick={() => open('project')}
                >
                  Take a look <ArrowUpRight size={15} />
                </button>
                <div>
                  <button
                    onClick={() =>
                      setIndex((index - 1 + projects.length) % projects.length)
                    }
                    aria-label="Previous project"
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <button
                    onClick={() => setIndex((index + 1) % projects.length)}
                    aria-label="Next project"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
        <InteractionOrb
          className="room-screen-mode"
          label={
            screenAsleep ? 'Return to projects' : 'Start the desk screen saver'
          }
          hint={screenAsleep ? 'Back to work' : 'Let it rest'}
          pressed={screenAsleep}
          onClick={() => setScreenAsleep(value => !value)}
        />
        <SlackProfile onOpen={() => open('remote')} />
        <InteractionOrb
          className="room-remote"
          label="About my work at Remote.com"
          hint="The day job"
          onClick={() => open('remote')}
          hasPopup="dialog"
        />
        <InteractionOrb
          className="room-notebook"
          label="Writing"
          href={worldRoutes.writing}
        />
        <InteractionOrb
          className="room-lamp"
          label={light ? 'Dim desk lamp' : 'Brighten desk lamp'}
          hint={light ? 'Lights down' : 'Lights up'}
          pressed={!light}
          onClick={() => setLight(v => !v)}
        />
      </div>
      <noscript>
        <div className="world-noscript">
          <p>Work & projects</p>
          {projects.map(p => (
            <details key={p.id}>
              <summary>
                {p.name} · {p.status}
              </summary>
              {p.paragraphs.map(text => (
                <p key={text}>{text}</p>
              ))}
              {p.link && <a href={p.link.href}>{p.link.label} ↗</a>}
            </details>
          ))}
          <p>
            Senior engineer at <a href="https://remote.com">Remote.com</a>. 10+
            years building software; cofounder of Zephony.
          </p>
          <a href={weddingWebsite.href}>Our wedding website — built by me ↗</a>
        </div>
      </noscript>
      <WorldDialog
        open={panel !== null}
        onOpenChange={close}
        title={panel === 'remote' ? 'The day job.' : project.name}
        eyebrow={
          panel === 'project' ? project.status : 'Remote.com · Senior engineer'
        }
      >
        {panel === 'project' && (
          <>
            {project.paragraphs.map(p => (
              <p key={p}>{p}</p>
            ))}
            {project.link && (
              <a
                className="world-text-link"
                href={project.link.href}
                target={
                  project.link.href.startsWith('https') ? '_blank' : undefined
                }
                rel="noopener noreferrer"
              >
                {project.link.label} ↗
              </a>
            )}
          </>
        )}
        {panel === 'remote' && (
          <>
            <p>
              I’m a senior engineer at Remote.com. I’ve been building software
              for over ten years, with a startup I co-founded along the way.
            </p>
            <p>
              I like getting close to the actual problem: what the business
              needs, what’s getting in people’s way, and what’s worth building.
            </p>
            <a
              className="world-text-link"
              href="https://remote.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Remote.com ↗
            </a>
            <Link
              prefetch={false}
              className="world-text-link"
              href={articleHref('do-you-have-an-ideal-dream-job')}
            >
              My take on work and life ↗
            </Link>
          </>
        )}
      </WorldDialog>
    </main>
  );
}
