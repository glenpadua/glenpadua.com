'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavItem } from './MobileNav';
import { useLockBodyScroll } from 'utils/hooks';

const Wrapper = styled(motion.ul)`
  list-style: none;
  padding: 20px;
  padding-top: 28px;
  height: 100vh;
  background-color: #000;
  width: 200px;
  position: fixed;
  top: 0;
  right: 0;
  color: #fff;
  z-index: 10;
`;

const menuVariant = {
  closed: {
    right: -1000,
    transition: {
      duration: 0.5,
      delay: 0.1,
      when: 'afterChildren',
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    right: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  closed: { y: 20, opacity: 0 },
  open: { y: 0, opacity: 1 },
};

const Menu = ({ items }) => {
  useLockBodyScroll();
  const pathname = usePathname();

  return (
    <Wrapper
      variants={menuVariant}
      initial="closed"
      animate="open"
      exit="closed"
    >
      {items.map(item => (
        <NavItem
          variants={itemVariant}
          key={item.name}
          url={item.url}
          name={item.name}
          isActive={item.url === pathname}
        />
      ))}
    </Wrapper>
  );
};

export default Menu;
