import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Logo from 'components/Logo';
import MobileNav, { NavItem } from './MobileNav';
import { menuItems } from 'utils/helpers';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: 600px) {
    align-items: center;
  }
`;

const MainNav = styled.ul`
  list-style: none;
  color: #000;
  display: flex;
  font-size: 1em;

  @media only screen and (max-width: 600px) {
    display: none;
  }

  li {
    margin-right: 30px;
    margin-bottom: 0px;

    &:after {
      background-color: #000;
    }
  }
`;

const Header = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Logo size="small" />
      <MobileNav items={menuItems} />
      <MainNav>
        {menuItems.map(item => (
          <NavItem
            key={item.name}
            name={item.name}
            url={item.url}
            isActive={item.url === router.pathname}
          />
        ))}
      </MainNav>
    </Wrapper>
  );
};

export default Header;
