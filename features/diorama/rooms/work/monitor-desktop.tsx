'use client';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { createPortal, flushSync } from 'react-dom';
import {
  ChartLine,
  File as FileIcon,
  Maximize2,
  Minimize2,
  PiggyBank,
  Shapes,
  Siren,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useMotionPolicy } from '../../shared/scene-motion';
import {
  deskToasts,
  type DeskFile,
  type DeskIcon,
  type ScrapIcon,
} from './content';
import { DeskWallpaper } from './desk-wallpaper';
import styles from './monitor-desktop.module.css';
import {
  workScreen,
  workScreenMask,
  workScreenPortrait,
  workScreenPortraitMask,
} from './screen-mask';

// The painted screen's measured box and mask in each painting, as custom
// properties so the room's layout decides which painting is showing.
const screenVars = {
  '--screen-left': `${workScreen.left}%`,
  '--screen-top': `${workScreen.top}%`,
  '--screen-width': `${workScreen.width}%`,
  '--screen-height': `${workScreen.height}%`,
  '--screen-mask': workScreenMask,
  '--portrait-screen-left': `${workScreenPortrait.left}%`,
  '--portrait-screen-top': `${workScreenPortrait.top}%`,
  '--portrait-screen-width': `${workScreenPortrait.width}%`,
  '--portrait-screen-height': `${workScreenPortrait.height}%`,
  '--portrait-screen-mask': workScreenPortraitMask,
} as CSSProperties;

interface OpenWindow {
  id: string;
  x: number;
  y: number;
  z: number;
}

const glyphs: Record<DeskIcon, ReactNode> = {
  chat: (
    <>
      <path
        d="M5 6h22a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H13l-6 5v-5H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z"
        fill="#6f9577"
      />
      <path
        d="M9 13h14M9 18h9"
        stroke="#fff8e4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  plate: (
    <>
      <ellipse
        cx="16"
        cy="18"
        rx="13"
        ry="9"
        fill="#e9dcc0"
        stroke="#b08a57"
        strokeWidth="1.5"
      />
      <ellipse cx="16" cy="17" rx="8" ry="5" fill="#d98b5f" />
      <path
        d="M11 16c2-2 8-2 10 0"
        stroke="#fff3dc"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  folder: (
    <>
      <path
        d="M3 9a2 2 0 0 1 2-2h8l3 3h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
        fill="#d9ad6b"
      />
      <path d="M3 13h26v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" fill="#e7c184" />
    </>
  ),
  career: (
    <>
      <path
        d="M8 3h12l6 6v19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        fill="#fbf4e2"
        stroke="#9aa58e"
        strokeWidth="1.5"
      />
      <path
        d="M11 13h11M11 17h11M11 21h7"
        stroke="#54765d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  inbox: (
    <>
      <path
        d="M4 17 8 7h16l4 10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
        fill="#8fb0c4"
      />
      <path
        d="M4 17h7l2 3h6l2-3h7"
        stroke="#fff8e4"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  ),
  trash: (
    <>
      <path
        d="M8 10h16l-1.5 17a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2Z"
        fill="#b9b7a8"
      />
      <path
        d="M6 9h20M13 6h6"
        stroke="#6f6b5c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 14v10M19 14v10"
        stroke="#fff8e4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
};

const scrapIcons: Record<ScrapIcon, LucideIcon> = {
  chart: ChartLine,
  piggy: PiggyBank,
  siren: Siren,
  shapes: Shapes,
  file: FileIcon,
};

function Glyph({ icon }: { icon: DeskIcon }): JSX.Element {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {glyphs[icon]}
    </svg>
  );
}

function FileContents({ file }: { file: DeskFile }): JSX.Element {
  return (
    <>
      {file.status && <p className={styles.status}>{file.status}</p>}
      {file.blocks?.map(block => (
        <section key={block.label} className={styles.block}>
          <h3>{block.label}</h3>
          <p>{block.text}</p>
        </section>
      ))}
      {file.timeline && (
        <ol className={styles.timeline}>
          {file.timeline.map(item => (
            <li key={item.what}>
              <span>{item.when}</span>
              <strong>{item.what}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>
      )}
      {file.paragraphs?.map(text => (
        <p key={text}>{text}</p>
      ))}
      {file.scraps && (
        <ul className={styles.scraps}>
          {file.scraps.map((scrap, i) => {
            const Icon = scrapIcons[scrap.icon];
            return (
              <li
                key={scrap.name}
                style={
                  { '--tilt': `${(((i * 7) % 5) - 2) * 3}deg` } as CSSProperties
                }
              >
                <Icon aria-hidden="true" />
                <span>{scrap.name}</span>
              </li>
            );
          })}
        </ul>
      )}
      {file.link && (
        <a
          className={styles.link}
          href={file.link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {file.link.label} {/^https?:/.test(file.link.href) ? '↗\uFE0E' : '→'}
        </a>
      )}
    </>
  );
}

// One note per visit: the server renders the first; the client swaps in a
// random one after hydration, without a mismatch.
const notePick = typeof window === 'undefined' ? 0 : Math.random();
const noSubscription = () => () => {};

/** Glen's local time, shown only once mounted (no server/client mismatch). */
export function ValenciaClock(): JSX.Element {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Madrid',
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, []);
  return <span aria-hidden="true">{time && `Valencia ${time}`}</span>;
}

/**
 * The Work monitor as a small desktop: icons open draggable windows, a mini
 * cursor follows the visitor, and when nobody is using it Glen's cursor
 * wanders between files. Lean in to enlarge it; phones lean in on open.
 */
export function MonitorDesktop({
  files,
  notes,
  asleep,
  saver,
  dark = false,
  onIdle,
}: {
  files: readonly DeskFile[];
  notes: readonly string[];
  asleep: boolean;
  saver: ReactNode;
  /** The room's desk lamp is off: the desktop follows it into dark mode. */
  dark?: boolean;
  /** Nobody has touched the page for a while: the room lets the screen sleep. */
  onIdle?: () => void;
}): JSX.Element {
  const { enabled } = useMotionPolicy();
  const note = useSyncExternalStore(
    noSubscription,
    () => notes[Math.floor(notePick * notes.length)],
    () => notes[0],
  );
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [zoomed, setZoomed] = useState(false);
  const [wandering, setWandering] = useState<string | null>(null);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [band, setBand] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const bandStart = useRef<{ x: number; y: number; pointer: number } | null>(
    null,
  );
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const menuFirst = useRef<HTMLButtonElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  // The machine itself: on, off, or starting up; and its system menu.
  const [power, setPower] = useState<'on' | 'off' | 'booting'>('on');
  const [systemMenu, setSystemMenu] = useState(false);
  const systemButton = useRef<HTMLButtonElement>(null);
  const systemFirst = useRef<HTMLButtonElement>(null);
  const powerButton = useRef<HTMLButtonElement>(null);
  const bootTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(bootTimer.current), []);
  const screen = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const icons = useRef(new Map<string, HTMLButtonElement>());
  const panes = useRef(new Map<string, HTMLElement>());
  const lastMove = useRef(0);
  const leanButton = useRef<HTMLButtonElement>(null);
  const leanChanged = useRef(false);
  // A window opened on a phone waits for the lean-in before taking focus.
  const pendingFocus = useRef<string | null>(null);
  // Leaning in remounts the screen elsewhere; keep keyboard focus with it.
  useEffect(() => {
    if (!leanChanged.current) return;
    leanChanged.current = false;
    const id = pendingFocus.current;
    pendingFocus.current = null;
    if (id) panes.current.get(id)?.focus();
    else leanButton.current?.focus();
  }, [zoomed]);
  const topZ = useRef(1);
  const drag = useRef<{
    id: string;
    pointer: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
  } | null>(null);

  const narrow = () => window.matchMedia('(max-width: 760px)').matches;

  // A same-document view transition makes leaning in feel like one screen
  // moving closer; without support or motion it simply switches.
  const setLean = (value: boolean) => {
    leanChanged.current = true;
    const apply = () => flushSync(() => setZoomed(value));
    const start = (
      document as Document & { startViewTransition?: (cb: () => void) => void }
    ).startViewTransition;
    if (enabled && start) start.call(document, apply);
    else apply();
  };

  const focusPane = (id: string) =>
    requestAnimationFrame(() => panes.current.get(id)?.focus());

  const open = (file: DeskFile) => {
    const leaning = narrow() && !zoomed;
    if (leaning) pendingFocus.current = file.id;
    topZ.current += 1;
    const z = topZ.current;
    setWindows(current => {
      const existing = current.find(w => w.id === file.id);
      if (existing)
        return current.map(w => (w.id === file.id ? { ...w, z } : w));
      const n = current.length;
      return [
        ...current,
        { id: file.id, x: 40 + (n % 3) * 3, y: 13 + (n % 3) * 6, z },
      ];
    });
    if (leaning) setLean(true);
    else focusPane(file.id);
  };

  const close = (id: string) => {
    setWindows(current => current.filter(w => w.id !== id));
    requestAnimationFrame(() => icons.current.get(id)?.focus());
  };

  const raise = (id: string) => {
    topZ.current += 1;
    const z = topZ.current;
    setWindows(current => current.map(w => (w.id === id ? { ...w, z } : w)));
  };

  // Dragging a window by its title bar, kept inside the screen.
  const grab = (event: PointerEvent<HTMLElement>, win: OpenWindow) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('button'))
      return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: win.id,
      pointer: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: win.x,
      y: win.y,
    };
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    const box = screen.current?.getBoundingClientRect();
    const pane = d && panes.current.get(d.id)?.getBoundingClientRect();
    if (!d || !box || !pane || d.pointer !== event.pointerId) return;
    const maxX = 100 - (pane.width / box.width) * 100;
    const maxY = 100 - (pane.height / box.height) * 100;
    const x = d.x + ((event.clientX - d.startX) / box.width) * 100;
    const y = d.y + ((event.clientY - d.startY) / box.height) * 100;
    setWindows(current =>
      current.map(w =>
        w.id === d.id
          ? {
              ...w,
              x: Math.min(Math.max(0, x), maxX),
              y: Math.min(Math.max(8, y), maxY),
            }
          : w,
      ),
    );
  };
  const release = () => {
    drag.current = null;
  };

  const onBackground = (target: EventTarget) =>
    !(target as HTMLElement).closest(
      'button, a, [data-window], [data-menubar], [role="menu"]',
    );

  // Rubber-band selection on the empty desktop: it only highlights icons.
  const press = (event: PointerEvent<HTMLDivElement>) => {
    const inMenu = (event.target as HTMLElement).closest(
      '[role="menu"], [aria-haspopup="menu"]',
    );
    if (menu && !inMenu) setMenu(null);
    if (systemMenu && !inMenu) setSystemMenu(false);
    if (
      event.pointerType !== 'mouse' ||
      event.button !== 0 ||
      !onBackground(event.target)
    )
      return;
    // No text selection or native image drag: either would cancel the band.
    event.preventDefault();
    const box = screen.current!.getBoundingClientRect();
    bandStart.current = {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
      pointer: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(new Set());
  };
  const stretch = (event: PointerEvent<HTMLDivElement>) => {
    const start = bandStart.current;
    const box = screen.current?.getBoundingClientRect();
    if (!start || !box || start.pointer !== event.pointerId) return;
    const x2 = event.clientX - box.left;
    const y2 = event.clientY - box.top;
    const rect = {
      x: Math.min(start.x, x2),
      y: Math.min(start.y, y2),
      w: Math.abs(x2 - start.x),
      h: Math.abs(y2 - start.y),
    };
    setBand(rect);
    const hit = new Set<string>();
    icons.current.forEach((node, id) => {
      const r = node.getBoundingClientRect();
      const left = r.left - box.left;
      const top = r.top - box.top;
      if (
        left < rect.x + rect.w &&
        left + r.width > rect.x &&
        top < rect.y + rect.h &&
        top + r.height > rect.y
      )
        hit.add(id);
    });
    setSelected(hit);
  };
  const letGo = () => {
    bandStart.current = null;
    setBand(null);
  };
  const contextMenu = (event: MouseEvent) => {
    if (!onBackground(event.target)) return;
    event.preventDefault();
    const box = screen.current!.getBoundingClientRect();
    setMenu({
      x: Math.min(event.clientX - box.left, box.width - 150),
      y: Math.min(event.clientY - box.top, box.height - 70),
    });
    requestAnimationFrame(() => menuFirst.current?.focus());
  };

  // Every so often, while nobody is reading, a quiet notification drifts in.
  useEffect(() => {
    if (!enabled || asleep || windows.length) return;
    let shown = 0;
    let last = performance.now();
    let hide: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      const now = performance.now();
      if (document.hidden || now - lastMove.current < 12_000) return;
      if (now - last < 40_000 || Math.random() > 0.6) return;
      last = now;
      setToast(deskToasts[shown++ % deskToasts.length]);
      hide = setTimeout(() => setToast(null), 5200);
    }, 15_000);
    return () => {
      clearInterval(timer);
      clearTimeout(hide);
    };
  }, [enabled, asleep, windows.length]);

  // The visitor's mini cursor. Updated directly: no re-render per move.
  const track = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    stretch(event);
    const box = screen.current?.getBoundingClientRect();
    if (!box || !cursor.current) return;
    lastMove.current = performance.now();
    if (wandering) setWandering(null);
    cursor.current.dataset.mode = 'visitor';
    cursor.current.style.transform = `translate(${event.clientX - box.left}px, ${event.clientY - box.top}px)`;
  };
  const leave = () => {
    if (cursor.current) cursor.current.dataset.mode = 'hidden';
  };

  // Nobody here: Glen's cursor drifts from file to file, highlighting only.
  useEffect(() => {
    if (!enabled || asleep || windows.length) return;
    let step = 0;
    const timer = setInterval(() => {
      if (performance.now() - lastMove.current < 6000) return;
      const box = screen.current?.getBoundingClientRect();
      const file = files[step % files.length];
      const icon = icons.current.get(file.id)?.getBoundingClientRect();
      step += 1;
      if (!box || !icon || !cursor.current) return;
      cursor.current.dataset.mode = 'wander';
      cursor.current.style.transform = `translate(${icon.left - box.left + icon.width * 0.62}px, ${icon.top - box.top + icon.height * 0.45}px)`;
      setWandering(file.id);
    }, 2600);
    return () => clearInterval(timer);
  }, [enabled, asleep, windows.length, files]);

  const wanderingIcon =
    enabled && !asleep && !windows.length ? wandering : null;

  const boot = () => {
    setPower('booting');
    clearTimeout(bootTimer.current);
    bootTimer.current = setTimeout(
      () => {
        setPower('on');
        requestAnimationFrame(() => systemButton.current?.focus());
      },
      enabled ? 2600 : 500,
    );
  };
  const restart = () => {
    setSystemMenu(false);
    setWindows([]);
    boot();
  };
  const shutDown = () => {
    setSystemMenu(false);
    setWindows([]);
    setPower('off');
    requestAnimationFrame(() => powerButton.current?.focus());
  };
  const toggleSystemMenu = () => {
    setMenu(null);
    setSystemMenu(open => {
      if (!open) requestAnimationFrame(() => systemFirst.current?.focus());
      return !open;
    });
  };

  // A long quiet spell on the whole page lets the screen drift to sleep.
  useEffect(() => {
    if (!onIdle || !enabled || asleep || power !== 'on') return;
    if (windows.length || zoomed) return;
    let last = performance.now();
    const stir = () => {
      last = performance.now();
    };
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'wheel'];
    events.forEach(e => window.addEventListener(e, stir, { passive: true }));
    const timer = setInterval(() => {
      if (!document.hidden && performance.now() - last > 90_000) onIdle();
    }, 5000);
    return () => {
      clearInterval(timer);
      events.forEach(e => window.removeEventListener(e, stir));
    };
  }, [onIdle, enabled, asleep, power, windows.length, zoomed]);

  const escape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return;
    if (systemMenu) {
      event.stopPropagation();
      setSystemMenu(false);
      return systemButton.current?.focus();
    }
    if (menu) {
      event.stopPropagation();
      return setMenu(null);
    }
    const pane = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-window]',
    );
    if (pane) {
      event.stopPropagation();
      close(pane.dataset.window!);
    } else if (zoomed) setLean(false);
  };

  const desk = (
    <section
      className={`desk-monitor ${styles.monitor}`}
      aria-label="Glen’s desktop"
      data-zoomed={zoomed}
      data-dark={dark}
      style={screenVars}
      onKeyDown={escape}
    >
      {asleep ? (
        saver
      ) : (
        <div
          ref={screen}
          className={styles.screen}
          onPointerDown={press}
          onPointerMove={track}
          onPointerUp={letGo}
          onPointerCancel={letGo}
          onPointerLeave={leave}
          onContextMenu={contextMenu}
        >
          <DeskWallpaper dark={dark} />
          {power === 'off' && (
            <div className={styles.off}>
              <p>It’s now safe to walk away from your desk.</p>
              <button ref={powerButton} onClick={boot}>
                Turn it back on
              </button>
            </div>
          )}
          {power === 'booting' && (
            <div className={styles.boot} role="status">
              <span className={styles.bootMark}>glen padua.</span>
              <span className={styles.bootBar} aria-hidden="true">
                <i />
              </span>
              <span className="sr-only">Starting up</span>
            </div>
          )}
          {power === 'on' && (
            <>
              <div className={styles.menubar} data-menubar>
                <button
                  ref={systemButton}
                  className={styles.system}
                  aria-haspopup="menu"
                  aria-expanded={systemMenu}
                  onClick={toggleSystemMenu}
                >
                  <i /> Glen’s desktop
                </button>
                {systemMenu && (
                  <div
                    className={`${styles.menu} ${styles.systemMenu}`}
                    role="menu"
                    aria-label="Glen’s desktop"
                  >
                    <button ref={systemFirst} role="menuitem" onClick={restart}>
                      Restart
                    </button>
                    <button role="menuitem" onClick={shutDown}>
                      Shut down
                    </button>
                  </div>
                )}
                <ValenciaClock />
                <button
                  ref={leanButton}
                  className={styles.lean}
                  onClick={() => setLean(!zoomed)}
                  aria-label={
                    zoomed ? 'Back to the room' : 'Lean in to the screen'
                  }
                >
                  {zoomed ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                </button>
              </div>
              <ul className={styles.icons} aria-label="Files">
                {files.map(file => (
                  <li key={file.id}>
                    <button
                      ref={node => {
                        if (node) icons.current.set(file.id, node);
                        else icons.current.delete(file.id);
                      }}
                      className={styles.icon}
                      data-wander={wanderingIcon === file.id}
                      data-selected={selected.has(file.id)}
                      data-open={windows.some(w => w.id === file.id)}
                      onClick={() => open(file)}
                    >
                      <Glyph icon={file.icon} />
                      <span>{file.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>{note}</p>
              {toast && (
                <p key={toast} className={styles.toast} aria-hidden="true">
                  {toast}
                </p>
              )}
              {band && (
                <span
                  className={styles.band}
                  style={{
                    left: band.x,
                    top: band.y,
                    width: band.w,
                    height: band.h,
                  }}
                  aria-hidden="true"
                />
              )}
              {menu && (
                <div
                  className={styles.menu}
                  role="menu"
                  aria-label="Desktop"
                  style={{ left: menu.x, top: menu.y }}
                >
                  <button
                    ref={menuFirst}
                    role="menuitem"
                    onClick={() => {
                      setMenu(null);
                      setLean(!zoomed);
                    }}
                  >
                    {zoomed ? 'Back to the room' : 'Lean in'}
                  </button>
                </div>
              )}
              {windows.map(win => {
                const file = files.find(f => f.id === win.id)!;
                return (
                  <section
                    key={win.id}
                    ref={node => {
                      if (node) panes.current.set(win.id, node);
                      else panes.current.delete(win.id);
                    }}
                    className={styles.window}
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby={`desk-window-${win.id}`}
                    tabIndex={-1}
                    data-window={win.id}
                    style={{
                      left: `${win.x}%`,
                      top: `${win.y}%`,
                      zIndex: 10 + win.z,
                    }}
                    onPointerDown={() => raise(win.id)}
                  >
                    <header
                      className={styles.titlebar}
                      onPointerDown={event => grab(event, win)}
                      onPointerMove={move}
                      onPointerUp={release}
                      onPointerCancel={release}
                    >
                      <h2 id={`desk-window-${win.id}`}>{file.title}</h2>
                      <button
                        onClick={() => close(win.id)}
                        aria-label={`Close ${file.title}`}
                      >
                        <X size={12} />
                      </button>
                    </header>
                    <div className={styles.body}>
                      <FileContents file={file} />
                    </div>
                  </section>
                );
              })}
            </>
          )}
          <span
            ref={cursor}
            className={styles.cursor}
            data-mode="hidden"
            aria-hidden="true"
          >
            <svg viewBox="0 0 12 18">
              <path
                d="M1 1v14l3.6-3.4L7 17l2.4-1-2.3-5.2H12Z"
                fill="#fffaf0"
                stroke="#2d4139"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      )}
    </section>
  );
  // Leaning in only happens after interaction, so the document exists here.
  const root = zoomed
    ? (document.querySelector('.world') ?? document.body)
    : null;
  if (!root) return desk;
  // The art stage is transformed, so a fixed, enlarged screen lives at the
  // world root; the painted monitor keeps a plain lit screen meanwhile.
  return (
    <>
      <div className="desk-monitor" aria-hidden="true" style={screenVars} />
      {createPortal(
        <>
          <button
            className={styles.backdrop}
            aria-label="Back to the room"
            tabIndex={-1}
            onClick={() => setLean(false)}
          />
          {desk}
        </>,
        root,
      )}
    </>
  );
}

/** Without JavaScript: every file's contents as plain sections. */
export function DesktopFallback({
  files,
}: {
  files: readonly DeskFile[];
}): JSX.Element {
  return (
    <>
      {files.map(file => (
        <details key={file.id}>
          <summary>
            {file.title}
            {file.status && ` · ${file.status}`}
          </summary>
          <FileContents file={file} />
        </details>
      ))}
    </>
  );
}
