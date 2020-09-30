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

const Layout = props => (
  <Wrapper>
    <Header />
    {props.children}
  </Wrapper>
);

export default Layout;
