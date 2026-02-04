import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled.button`
  outline: none;
  border: none;
  user-select: none;
  cursor: pointer;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  z-index: 1000;
`;

const Line = styled(motion.div)`
  width: 20px;
  border: 2px solid #000;
  border-radius: 20%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 20px;
  justify-content: space-between;
`;

const closedCommon = {
  rotate: 0,
  y: 0,
  border: '2px solid #000',
  transition: {
    delay: 0.65,
  },
};

const openCommon = {
  border: '2px solid #fff',
  transition: {
    delay: 0.5,
  },
};
const MenuToggle = ({ toggle }) => (
  <Button type="button" onClick={toggle}>
    <Wrapper>
      <Line
        variants={{
          closed: closedCommon,
          open: {
            rotate: -45,
            y: 6,
            ...openCommon,
          },
        }}
      />
      <Line
        variants={{
          closed: {
            opacity: 1,
            transition: {
              delay: 0.65,
            },
          },
          open: {
            opacity: 0,
            transition: {
              delay: 0.5,
            },
          },
        }}
      />
      <Line
        variants={{
          closed: closedCommon,
          open: {
            rotate: 45,
            y: -10,
            ...openCommon,
          },
        }}
      />
    </Wrapper>
  </Button>
);

export default MenuToggle;
