'use client';

import { useId } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Waves } from 'lucide-react';
import { MotionToggle, useSceneMotion } from './scene-motion';
import { NatureArt } from './nature-art';
import { PushupSprite } from './pushup-sprite';

export function CoastScene({
  standalone = false,
}: {
  standalone?: boolean;
}): JSX.Element {
  const { root, moving } = useSceneMotion();
  const waveId = useId();
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section
      id="coast"
      ref={root}
      className="lakeside-scene coast-scene"
      data-moving={moving}
      aria-labelledby="coast-title"
    >
      <div className="landscape coast-landscape" aria-hidden="true">
        <img
          className="landscape-art"
          src="/assets/diorama/coast.webp"
          width="1536"
          height="1024"
          alt=""
          loading={standalone ? 'eager' : 'lazy'}
        />
        <svg className="sea-motion" viewBox="0 0 1536 1024">
          <defs>
            <clipPath id={`${waveId}-shore`}>
              <path d="M440 600C358 617 106 626 62 640C35 651 169 675 310 692S655 710 716 730S992 754 1081 778C1110 786 1037 786 1049 796C1080 815 1390 831 1560 843V590H440Z" />
            </clipPath>
            <linearGradient id={`${waveId}-fade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="black" />
              <stop offset=".3" stopColor="white" />
            </linearGradient>
            <mask id={`${waveId}-water`}>
              <rect
                x="0"
                y="590"
                width="1536"
                height="270"
                fill={`url(#${waveId}-fade)`}
              />
            </mask>
          </defs>
          {/* Move the painted foam itself so the wash keeps the artwork's texture. */}
          <g className="shore-surge">
            <g
              clipPath={`url(#${waveId}-shore)`}
              mask={`url(#${waveId}-water)`}
            >
              <image
                href="/assets/diorama/coast.webp"
                width="1536"
                height="1024"
              />
            </g>
          </g>
          <g
            className="sea-glints"
            fill="none"
            stroke="#effff5"
            strokeLinecap="round"
          >
            <path d="M700 610h65m105 10h116m198-18h70m90 14h131M495 642h130m100 18h115m180-12h160m130 13h135" />
            <path d="M455 680h124m301 12h131m90-10h78m144 15h117M800 720h80m142 8h138m170 17h110" />
          </g>
          <g fill="none" stroke="#fffef0" strokeLinecap="round">
            <path
              className="shore-wave shore-wave-one"
              d="M435 611C320 625 170 635 116 645S228 673 362 686 665 705 753 724 1005 746 1110 770 1330 804 1560 817"
            />
            <path
              className="shore-wave shore-wave-two"
              d="M435 611C320 625 170 635 116 645S228 673 362 686 665 705 753 724 1005 746 1110 770 1330 804 1560 817"
            />
          </g>
        </svg>
        <div className="sailboat">
          <NatureArt kind="boat" className="boat-rock" />
          <span className="boat-wake" />
        </div>
      </div>
      <div className="coast-palm" aria-hidden="true">
        <NatureArt kind="palm" className="palm-sway" />
      </div>
      <div className="sky-birds coast-birds" aria-hidden="true">
        <svg viewBox="0 0 180 80">
          <path
            className="bird-wing"
            d="M20 35Q32 27 42 39Q52 27 65 34M93 18Q105 11 114 23Q124 12 136 17"
          />
        </svg>
      </div>
      <div className="coast-topline">
        <a href={standalone ? '/preview/diorama' : '#lakeside'}>
          {standalone ? 'Glen Padua' : '01 / The lakeside'}
        </a>
        <span>02 / THE COAST</span>
      </div>
      <div className="scene-introduction coast-introduction">
        <p className="scene-eyebrow">
          <span /> A DIFFERENT VIEW. THE SAME CURIOSITY.
        </p>
        <Heading id="coast-title">
          Good things
          <br />
          happen <em>outside.</em>
        </Heading>
        <p className="scene-description">
          New places. Small rituals. A little salt in the air.
          <br className="desktop-break" /> There’s a whole world beyond the
          screen.
          <br className="desktop-break" /> I like to bring some of it back to
          what I build.
        </p>
        <Link className="scene-work-link" href="/blog">
          Notes along the way <ArrowUpRight size={18} strokeWidth={1.5} />
        </Link>
      </div>
      <figure
        className="exercise-figure pushup-figure"
        aria-label="Glen doing controlled push-ups on the sand, wearing sunglasses and a yellow striped shirt. His left leg has a dark prosthetic socket and metal pylon."
      >
        <PushupSprite moving={moving} />
        <figcaption>A change of pace. A few more reps.</figcaption>
      </figure>
      <div className="foreground-layer coast-grass" aria-hidden="true">
        <img
          src="/assets/diorama/foreground.webp"
          width="1536"
          height="1024"
          alt=""
          loading="lazy"
        />
      </div>
      <footer className="scene-footer">
        <div className="scene-location">
          <Waves size={17} strokeWidth={1.25} />
          <span>Less hurry. More horizon.</span>
        </div>
        <a className="scene-scroll" href="#field-notes">
          <ArrowDown size={17} />
          <span>A FIELD NOTE</span>
        </a>
        <MotionToggle />
      </footer>
    </section>
  );
}
