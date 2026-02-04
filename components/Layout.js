import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-5 py-5 lg:px-10">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
