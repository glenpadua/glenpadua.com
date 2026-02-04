import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;

  @media only screen and (min-width: 1100px) {
    padding: 20px 40px;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Header />
        {children}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Layout;
