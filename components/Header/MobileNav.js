'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from 'utils/hooks';
import Menu from './Menu';
import MenuToggle from './MenuToggle';

const Wrapper = styled.div`
  display: none;

  @media only screen and (max-width: 600px) {
    display: initial;
  }
`;

const Item = styled(motion.li)`
  cursor: pointer;
  margin-bottom: 20px;

  &:after {
    transition: all ease-out 0.2s;
    display: block;
    margin-top: 5px;
    content: '';
    height: 2px;
    width: ${props => (props.$isActive ? '100%' : '0')};
    background-color: #fff;
  }

  &:hover:after {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.1em;
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

export const NavItem = ({ name, url, isActive, ...props }) => {
  return (
    <Item $isActive={isActive} {...props}>
      <StyledLink href={url}>{name}</StyledLink>
    </Item>
  );
};

const MobileNav = ({ items }) => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <Wrapper>
      <motion.div
        ref={ref}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
      >
        <MenuToggle toggle={() => setOpen(!isOpen)} />
        <AnimatePresence>{isOpen && <Menu items={items} />}</AnimatePresence>
      </motion.div>
    </Wrapper>
  );
};

export default MobileNav;
