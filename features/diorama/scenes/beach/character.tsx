'use client';
import { useEffect, useId, useRef } from 'react';
import { worldAsset } from '../../lib/assets';
import type { CharacterProps } from '../../model/scene-runtime';
import { FOOTBALL, footballPose } from './football';

/** The approved drawing, articulated at its real rigid prosthetic joints. */
export function BeachCharacter({
  load,
  onError,
  play = 0,
  moving,
}: CharacterProps & { moving: boolean }): JSX.Element {
  const id = useId().replace(/:/g, '');
  const upper = useRef<SVGGElement>(null);
  const lower = useRef<SVGGElement>(null);
  const shoe = useRef<SVGGElement>(null);
  const ball = useRef<SVGGElement>(null);
  const clock = useRef(0);
  const request = useRef(play);
  const progress = useRef(-1);

  useEffect(() => {
    if (!moving || !load) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      clock.current += dt;
      if (request.current !== play) {
        request.current = play;
        // Repeated taps finish the current touch rather than teleporting the ball.
        if (progress.current < 0) progress.current = 0;
        clock.current = 0;
      }
      if (progress.current < 0 && clock.current > 5.8) {
        progress.current = 0;
        clock.current = 0;
      }
      if (progress.current >= 0) {
        progress.current = Math.min(
          1,
          progress.current + dt / FOOTBALL.duration,
        );
        const pose = footballPose(progress.current);
        upper.current?.setAttribute(
          'transform',
          'rotate(' + pose.upperAngle + ' 273 298)',
        );
        lower.current?.setAttribute(
          'transform',
          'translate(' +
            (pose.knee.x - 320) +
            ' ' +
            (pose.knee.y - 343) +
            ') rotate(' +
            pose.lowerAngle +
            ' 320 343)',
        );
        shoe.current?.setAttribute(
          'transform',
          'translate(' + pose.roll + ' 0)',
        );
        ball.current?.setAttribute(
          'transform',
          'translate(' +
            pose.roll +
            ' 0) rotate(' +
            pose.ballAngle +
            ' 390 434)',
        );
        if (progress.current >= 1) progress.current = -1;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [moving, load, play]);

  const art = (
    <image
      href={load ? worldAsset('football-motion-v2') : undefined}
      width="1536"
      height="512"
      onError={onError}
    />
  );
  return (
    <div
      className="character-action character-beach"
      aria-hidden="true"
      data-moving={moving}
    >
      <svg viewBox="0 0 512 512" className="beach-footwork">
        <defs>
          <clipPath id={id + '-body'}>
            <path d="M0 0H512V279L362 300 287 275 258 282 246 353 264 490H0Z" />
          </clipPath>
          <clipPath id={id + '-upper'}>
            <path d="M257 278L287 278 322 305 341 329 339 350 320 362 293 339 264 326Z" />
          </clipPath>
          <clipPath id={id + '-lower'}>
            <path d="M315 333L332 334 357 369 365 386 345 395 331 373 312 349Z" />
          </clipPath>
          <clipPath id={id + '-shoe'}>
            <path d="M342 367L360 378Q387 363 406 380L407 388 340 420 329 403 330 388Z" />
          </clipPath>
        </defs>
        <ellipse
          cx="295"
          cy="475"
          rx="141"
          ry="12"
          fill="#967743"
          opacity=".16"
        />
        <g ref={ball}>
          <circle
            cx="390"
            cy="434"
            r="43"
            fill="#f1efde"
            stroke="#3c4141"
            strokeWidth="3"
          />
          <path
            d="M376 416L397 412 410 430 398 449 378 446 368 430Z M383 391L371 404 351 409 360 400Z M424 409L420 426 432 440 432 422Z M422 458L404 458 395 476 415 469Z M357 449L373 456 374 473 361 464Z"
            fill="#373e3f"
          />
          <path
            d="M376 416L371 404M397 412L405 395M410 430L420 426M398 449L404 458M378 446L373 456M368 430L349 431"
            fill="none"
            stroke="#626760"
            strokeWidth="1.8"
          />
          <path
            d="M357 448Q389 479 424 451"
            fill="none"
            stroke="#b9b8a6"
            strokeWidth="7"
            opacity=".35"
          />
        </g>
        <g ref={upper}>
          <g clipPath={'url(#' + id + '-upper)'}>{art}</g>
        </g>
        <g ref={lower}>
          <g clipPath={'url(#' + id + '-lower)'}>{art}</g>
        </g>
        <g clipPath={'url(#' + id + '-body)'}>{art}</g>
        <g ref={shoe}>
          <g clipPath={'url(#' + id + '-shoe)'}>{art}</g>
        </g>
      </svg>
    </div>
  );
}
