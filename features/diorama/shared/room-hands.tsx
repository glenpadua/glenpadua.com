import { worldAsset } from '../lib/assets';

/** Registered alternate paintings are revealed only around the moving hands. */
export function RoomHands({
  kind,
}: {
  kind: 'typing' | 'writing';
}): JSX.Element {
  return (
    <>
      {(kind === 'typing' ? ['left', 'right'] : ['right']).map(side => (
        <picture key={side} className={`room-hands hands-${kind} hand-${side}`}>
          <source
            media="(max-width:760px)"
            srcSet={worldAsset(`${kind}-portrait-v2`)}
          />
          <img
            src={worldAsset(`${kind}-desktop-v2`)}
            width={1536}
            height={1024}
            alt=""
            decoding="async"
          />
        </picture>
      ))}
    </>
  );
}
