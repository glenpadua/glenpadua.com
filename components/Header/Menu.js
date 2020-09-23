import React from 'react';
import { useRouter } from 'next/router';
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
  hidden: {
    right: -1000,
    transition: {
      duration: 0.5,
      delay: 0.1,
      when: 'afterChildren',
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
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
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Menu = ({ items }) => {
  useLockBodyScroll();
  const router = useRouter();

  return (
    <Wrapper
      variants={menuVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {items.map(item => (
        <NavItem
          variants={itemVariant}
          key={item.name}
          url={item.url}
          name={item.name}
          isActive={item.url === router.pathname}
        />
      ))}
    </Wrapper>
  );
};

export default Menu;
