import styled from 'styled-components';
import { SiGithub, SiLinkedin, SiInstagram, SiTwitter } from 'react-icons/si';

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  height: 150px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.7em;

  @media only screen and (min-width: 600px) {
    font-size: 0.9em;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 25px;
  height: auto;
  margin-right: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const Links = styled.div`
  margin-top: 20px;
`;

const IconLink = styled.a`
  margin: 0 10px;
  color: #000;
  opacity: 0.5;

  &:hover {
    opacity: 0.8;
  }
`;

const Icon = ({ url, icon }) => {
  return (
    <IconLink href={url} target="_blank">
      {icon}
    </IconLink>
  );
};

const sites = [
  {
    url: 'https://github.com/glenpadua',
    icon: <SiGithub />,
  },
  {
    url: 'https://www.linkedin.com/in/glen-padua/',
    icon: <SiLinkedin />,
  },
  {
    url: 'https://twitter.com/glenp01',
    icon: <SiTwitter />,
  },
  {
    url: 'https://www.instagram.com/glen.padua/',
    icon: <SiInstagram />,
  },
];

const Footer = () => {
  return (
    <Wrapper>
      <Text>
        <Logo src="/assets/logo.png" />
        <div>
          Built with{' '}
          <StyledLink
            href="https://nextjs.org/"
            target="_blank"
            style={{ color: '#0077fe' }}
          >
            NextJS
          </StyledLink>
          <span> & </span>
          <StyledLink
            href="https://prismic.io/"
            target="_blank"
            style={{ color: '#5163ba' }}
          >
            Prismic
          </StyledLink>
          {'  '}
          <span role="img" aria-label="heart on fire">
            ❤️‍🔥
          </span>{' '}
        </div>
      </Text>
      <Links>
        {sites.map(site => (
          <Icon icon={site.icon} url={site.url} key={site.url} />
        ))}
      </Links>
    </Wrapper>
  );
};

export default Footer;
