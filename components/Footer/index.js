import styled from 'styled-components';

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
`;

const Footer = () => {
  return (
    <Wrapper>
      <div>
        Built with{' '}
        <StyledLink href="http://nextjs.org/" target="_blank">
          NextJS
        </StyledLink>
        {'  '}
        <span role="img" aria-label="heart on fire" style={{ color: 'red' }}>
          ❤️‍🔥
        </span>{' '}
        <StyledLink href="https://prismic.io/" target="_blank">
          Prismic
        </StyledLink>
      </div>
    </Wrapper>
  );
};

export default Footer;
