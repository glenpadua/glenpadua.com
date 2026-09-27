'use client';
import type { SceneProps } from '../../model/scene-runtime';
import { SceneArtwork } from '../../shared/scene-artwork';
import { useMotionPolicy } from '../../shared/scene-motion';
import { BeachCharacter, BeachStill } from './character';
import { BeachAtmosphere } from './atmosphere';
import { BeachWater } from './water';
import { SiGithub } from 'react-icons/si';
import { InteractionOrb } from '../../shared/interaction-orb';
import { socialLinks } from '../../data/site';
import { BeachSocialPhone } from './social-phone';

export function BeachScene(props: SceneProps): JSX.Element {
  const { enabled } = useMotionPolicy();
  const moving = enabled && props.active;
  return (
    <SceneArtwork
      {...props}
      fallback={<BeachStill />}
      renderLayer={(layer, onError) =>
        layer.id === 'character' ? (
          <BeachCharacter load={props.load} onError={onError} moving={moving} />
        ) : undefined
      }
      afterLayer={layer =>
        layer.id === 'back' ? (
          <BeachWater load={props.load} moving={moving} />
        ) : undefined
      }
      atmosphere={<BeachAtmosphere moving={moving} />}
      controls={
        <>
          <BeachSocialPhone />
          <InteractionOrb
            className="beach-github"
            href={socialLinks.github}
            label="Glen on GitHub (opens in a new tab)"
            hint="GitHub ↗"
            marker={
              <SiGithub className="beach-github-sticker" aria-hidden="true" />
            }
          />
        </>
      }
    />
  );
}
