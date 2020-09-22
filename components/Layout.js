import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
`;

const Layout = props => (
  <Wrapper>
    <Header />
    {props.children}
  </Wrapper>
);

export default Layout;
