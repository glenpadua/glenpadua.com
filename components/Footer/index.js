import styled from 'styled-components';

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;

  @media only screen and (min-width: 600px) {
    font-size: 1em;
  }
`;

const Logo = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Logo src="/assets/logo.png" />
      <div>
        Built with{' '}
        <StyledLink href="https://nextjs.org/" target="_blank">
          NextJS
        </StyledLink>
        {'  '}
        <span role="img" aria-label="heart on fire">
          ❤️‍🔥
        </span>{' '}
        <StyledLink href="https://prismic.io/" target="_blank">
          Prismic
        </StyledLink>
      </div>
      <div></div>
    </Wrapper>
  );
};

export default Footer;
