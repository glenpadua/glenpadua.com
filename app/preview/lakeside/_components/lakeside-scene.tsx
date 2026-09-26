'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Pause, Play, Sun } from 'lucide-react';
import { PullupSprite } from './pullup-sprite';

export function LakesideScene(): JSX.Element {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [onScreen, setOnScreen] = useState(true);
  const moving = !paused && !reduced && visible && onScreen;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    sync();
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.offscreen = String(!entry.isIntersecting);
        setOnScreen(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (!moving) {
      element.style.setProperty('--look-x', '0px');
      element.style.setProperty('--look-y', '0px');
      return;
    }
    let frame = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      element.style.setProperty('--look-x', `${x}px`);
      element.style.setProperty('--look-y', `${y}px`);
      frame = 0;
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = element.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reset = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(update);
    };
    element.addEventListener('pointermove', pointer);
    element.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', pointer);
      element.removeEventListener('pointerleave', reset);
    };
  }, [moving]);

  return (
    <main className="lakeside-page">
      <section
        ref={root}
        className="lakeside-scene"
        data-moving={moving}
        aria-label="An illustrated morning by the lake"
      >
        <a className="scene-skip" href="#introduction">
          Skip to introduction
        </a>
        <div className="landscape" aria-hidden="true">
          <img
            className="landscape-art"
            src="/assets/diorama/landscape.webp"
            alt=""
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="morning-light" />
          <svg
            className="lake-light"
            viewBox="0 0 1536 1024"
            preserveAspectRatio="none"
          >
            <g fill="none" stroke="#ffffe6" strokeLinecap="round">
              <path
                className="ripple ripple-one"
                d="M738 710h111m-167 9h89m34 15h99m-152 15h58"
              />
              <path
                className="ripple ripple-two"
                d="M629 729h58m158-22h56m-173 30h101m-59 21h-69"
              />
            </g>
          </svg>
        </div>
        <div className="sky-birds" aria-hidden="true">
          <svg viewBox="0 0 180 80">
            <path
              className="bird-wing"
              d="M20 35Q32 27 42 39Q52 27 65 34M93 18Q105 11 114 23Q124 12 136 17M124 61Q133 55 141 65Q149 57 157 61"
            />
          </svg>
        </div>
        <div className="pollen" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <header className="scene-header">
          <Link
            className="scene-wordmark"
            href="/"
            aria-label="Glen Padua home"
          >
            glen padua<span className="wordmark-dot">.</span>
          </Link>
          <nav aria-label="Main navigation" className="scene-nav">
            <Link href="/work">
              Work <ArrowUpRight size={13} />
            </Link>
            <Link href="/blog">
              Writing <ArrowUpRight size={13} />
            </Link>
            <a
              className="hello-link"
              href="https://www.linkedin.com/in/glen-padua/"
            >
              Say hello <ArrowUpRight size={14} />
            </a>
          </nav>
        </header>

        <div className="scene-introduction" id="introduction" tabIndex={-1}>
          <p className="scene-eyebrow">
            <span /> ENGINEER BY TRADE. CURIOUS BY NATURE.
          </p>
          <h1>
            A little room
            <br />
            to <em>explore.</em>
          </h1>
          <p className="scene-description">
            I’m Glen. I build thoughtful software, follow my curiosity,
            <br className="desktop-break" /> and occasionally remember to get
            off the computer.
          </p>
          <Link className="scene-work-link" href="/work">
            Explore my work <ArrowUpRight size={18} strokeWidth={1.5} />
          </Link>
        </div>

        <figure
          className="exercise-figure"
          aria-label="Glen, wearing sunglasses and a yellow striped shirt, doing pull-ups. His left leg is a prosthesis."
        >
          <PullupSprite moving={moving} />
          <figcaption>A little stronger, one rep at a time.</figcaption>
        </figure>
        <div className="foreground-layer" aria-hidden="true">
          <img
            src="/assets/diorama/foreground.webp"
            alt=""
            width="1536"
            height="1024"
          />
        </div>

        <footer className="scene-footer">
          <div className="scene-location">
            <Sun size={17} strokeWidth={1.25} />
            <span>Somewhere between building & becoming.</span>
          </div>
          <a
            className="scene-scroll"
            href="#field-notes"
            aria-label="Read the field note"
          >
            <ArrowDown size={17} />
            <span>A FIELD NOTE</span>
          </a>
          <button
            className="motion-toggle"
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            disabled={reduced}
            aria-label={
              reduced
                ? 'Motion disabled by your reduced motion preference'
                : paused
                  ? 'Resume scene motion'
                  : 'Pause scene motion'
            }
          >
            {moving ? <Pause size={13} /> : <Play size={13} />}
            <span>
              {reduced
                ? 'Reduced motion'
                : paused
                  ? 'Motion paused'
                  : 'Pause motion'}
            </span>
          </button>
        </footer>
      </section>
      <section
        className="field-note"
        id="field-notes"
        aria-labelledby="field-note-title"
      >
        <p className="note-number">FIELD NOTE / 001</p>
        <div>
          <h2 id="field-note-title">Good things take a little curiosity.</h2>
          <p>
            This is a small corner of the internet for the things I make and the
            things that make me. Software, experiments, places, and a few more
            reps. Always a work in progress.
          </p>
          <Link href="/blog">
            Read my writing <ArrowUpRight size={17} />
          </Link>
        </div>
        <span className="note-signature">Glen</span>
      </section>
    </main>
  );
}
