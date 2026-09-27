import { SiTwitter } from 'react-icons/si';
import { socialLinks } from '../../data/site';
import { InteractionOrb } from '../../shared/interaction-orb';
import { DiscoveryMark } from '../../shared/discovery-mark';

/** Decorative feed silhouettes, not invented posts or a third-party embed. */
export function BeachSocialPhone(): JSX.Element {
  return (
    <InteractionOrb
      className="beach-social-phone"
      href={socialLinks.twitter}
      label="Glen on Twitter (opens in a new tab)"
      hint="Twitter ↗"
      marker={
        <>
          <svg
            className="beach-phone-art"
            viewBox="0 0 64 112"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="58"
              height="106"
              rx="9"
              fill="#282b34"
              stroke="#161b26"
              strokeWidth="3"
            />
            <rect x="7" y="9" width="50" height="92" rx="5" fill="#dbe9e8" />
            <path
              d="M24 9h16"
              stroke="#282b34"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <SiTwitter x="24" y="18" width="17" height="17" fill="#4c99b3" />
            {[42, 62, 82].map((y, i) => (
              <g key={y}>
                <circle
                  cx="16"
                  cy={y + 2}
                  r="4"
                  fill={['#ba9869', '#729b96', '#9498b0'][i]}
                />
                <path
                  d={`M25 ${y}h22 M25 ${y + 5}h17 M25 ${y + 10}h20`}
                  fill="none"
                  stroke="#7b9299"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            ))}
            <path
              d="M25 105h14"
              stroke="#9c9ca1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <DiscoveryMark />
        </>
      }
    />
  );
}
