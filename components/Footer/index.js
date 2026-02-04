import { SiGithub, SiLinkedin, SiInstagram, SiTwitter } from 'react-icons/si';
import { Separator } from 'components/ui/separator';

const sites = [
  {
    url: 'https://github.com/glenpadua',
    icon: SiGithub,
  },
  {
    url: 'https://www.linkedin.com/in/glen-padua/',
    icon: SiLinkedin,
  },
  {
    url: 'https://twitter.com/glenp01',
    icon: SiTwitter,
  },
  {
    url: 'https://www.instagram.com/glen.padua/',
    icon: SiInstagram,
  },
];

const Footer = () => {
  return (
    <footer className="flex h-[150px] w-full flex-col items-center justify-center text-[0.7em] sm:text-[0.9em]">
      <div className="flex items-center justify-center gap-2">
        <img src="/assets/logo.png" alt="Glen Padua logo" className="h-auto w-[25px]" />
        <div>
          Built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
            className="opacity-90 transition-opacity hover:opacity-100"
            style={{ color: '#0077fe' }}
          >
            NextJS
          </a>
          <span> & </span>
          <a
            href="https://prismic.io/"
            target="_blank"
            rel="noreferrer"
            className="opacity-90 transition-opacity hover:opacity-100"
            style={{ color: '#5163ba' }}
          >
            Prismic
          </a>{' '}
          <span role="img" aria-label="heart on fire">
            ❤️‍🔥
          </span>
        </div>
      </div>

      <Separator className="my-3 w-[240px] bg-black/10" />

      <div className="mt-1 flex items-center gap-5">
        {sites.map(site => {
          const Icon = site.icon;

          return (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="text-black/60 transition-colors hover:text-black/90"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
