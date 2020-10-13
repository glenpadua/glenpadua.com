import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;

  @media only screen and (min-width: 1100px) {
    padding: 20px 40px;
  }
`;

const Info = styled.p`
  margin-top: 10px;
  font-size: 0.8em;
  opacity: 0.5;
  text-align: center;
`;

const Layout = props => (
  <Wrapper>
    <Header />
    <Info>Note: This site is still a work in progress</Info>
    {props.children}
  </Wrapper>
);

export default Layout;
