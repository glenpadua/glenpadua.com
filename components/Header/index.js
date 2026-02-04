'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import MobileNav, { NavItem } from './MobileNav';
import { MainNav } from './styles';
import { menuItems } from 'utils/helpers';

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: 600px) {
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 65px;
  height: auto;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    width: 40px;
  }
`;

const Header = () => {
  const pathname = usePathname();

  return (
    <Wrapper>
      <Link href="/">
        <Logo src="/assets/logo.png" alt="Glen Padua logo" />
      </Link>
      <MobileNav items={menuItems} />
      <MainNav>
        {menuItems.map(item => (
          <NavItem
            key={item.name}
            name={item.name}
            url={item.url}
            isActive={item.url === pathname}
          />
        ))}
      </MainNav>
    </Wrapper>
  );
};

export default Header;
