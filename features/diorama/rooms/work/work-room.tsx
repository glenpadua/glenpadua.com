'use client';

import { useCallback, useState } from 'react';
import { worldAsset } from '../../lib/assets';
import { worldRoutes } from '../../lib/routes';
import { weddingWebsite, type DeskFile } from './content';
import { DesktopFallback, MonitorDesktop } from './monitor-desktop';
import { InteractionOrb } from '../../shared/interaction-orb';
import { TypingHands } from './typing-hands';
import { SlackProfile } from './slack-profile';
import { WeddingFrame } from './wedding-frame';
import { CoffeeSteam } from './coffee-steam';
import { SpinningGlobe } from './spinning-globe';
import { ScreenSaver } from './screen-saver';
import { ArtVeil } from '../../shared/art-veil';
import { artPlaceholders } from '../../data/placeholders';

export function WorkRoom({
  files,
  notes,
}: {
  files: readonly DeskFile[];
  notes: readonly string[];
}): JSX.Element {
  const [light, setLight] = useState(true);
  const [screenAsleep, setScreenAsleep] = useState(false);
  const goIdle = useCallback(() => setScreenAsleep(true), []);
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
        <MonitorDesktop
          files={files}
          notes={notes}
          asleep={screenAsleep}
          dark={!light}
          onIdle={goIdle}
          saver={
            <ScreenSaver dark={!light} onWake={() => setScreenAsleep(false)} />
          }
        />
        <InteractionOrb
          className="room-screen-mode"
          label={
            screenAsleep
              ? 'Wake the desk screen'
              : 'Start the desk screen saver'
          }
          hint={screenAsleep ? 'Back to work' : 'Let it rest'}
          pressed={screenAsleep}
          onClick={() => setScreenAsleep(value => !value)}
        />
        <SlackProfile />
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
        <ArtVeil
          src={artPlaceholders.work}
          portrait={artPlaceholders['work-portrait']}
        />
      </div>
      <noscript>
        <div className="world-noscript">
          <p>Work & projects</p>
          <DesktopFallback files={files} />
          <p>
            Senior engineer at <a href="https://remote.com">Remote.com</a>. 10+
            years building software; cofounder of Zephony.
          </p>
          <a href={weddingWebsite.href}>
            Our wedding website — built by me {'↗\uFE0E'}
          </a>
        </div>
      </noscript>
    </main>
  );
}
