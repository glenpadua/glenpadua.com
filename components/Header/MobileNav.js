import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLockBodyScroll } from 'utils/hooks';

const Wrapper = styled.div`
  display: none;

  @media only screen and (max-width: 600px) {
    display: initial;
  }
`;

const Menu = styled(motion.ul)`
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
`;

const Item = styled(motion.li)`
  cursor: pointer;
  margin-bottom: 20px;

  &:after {
    transition: all ease-out 0.5s;
    display: block;
    margin-top: 5px;
    content: '';
    height: 2px;
    width: 0;
    background-color: #fff;
  }

  &:hover:after {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-size: 1.1em;
`;

export const NavItem = ({ name, url, ...props }) => {
  return (
    <Item {...props}>
      <Link href={url}>
        <StyledLink>{name}</StyledLink>
      </Link>
    </Item>
  );
};

const iconCss = css`
  font-size: 25px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 25px;
  z-index: 1000;
  @keyframes showHide {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 3s ease 0s 1 showHide;
`;

const Burger = styled(FaBars)`
  ${iconCss};
  color: #000;
`;

const Close = styled(FaTimes)`
  ${iconCss};
  color: #fff;
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

const MobileNav = ({ items }) => {
  useLockBodyScroll();
  const [isOpen, setOpen] = useState(false);
  return (
    <Wrapper>
      {isOpen ? (
        <Close onClick={() => setOpen(false)} />
      ) : (
        <Burger onClick={() => setOpen(true)} />
      )}
      <AnimatePresence>
        {isOpen && (
          <Menu
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
              />
            ))}
          </Menu>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default MobileNav;
