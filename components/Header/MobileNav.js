import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useOnClickOutside } from 'utils/hooks';
import Menu from './Menu';

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
    width: ${props => (props.isActive ? '100%' : '0')};
    background-color: #fff;
  }

  &:hover:after {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-size: 1.1em;
`;

export const NavItem = ({ name, url, isActive, ...props }) => {
  return (
    <Item isActive={isActive} {...props}>
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
  z-index: 100;
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

const MobileNav = ({ items }) => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <Wrapper>
      <div ref={ref}>
        {isOpen ? (
          <Close
            onClick={e => {
              setOpen(false);
            }}
          />
        ) : (
          <Burger
            onClick={e => {
              setOpen(true);
            }}
          />
        )}
        <AnimatePresence>{isOpen && <Menu items={items} />}</AnimatePresence>
      </div>
    </Wrapper>
  );
};

export default MobileNav;
