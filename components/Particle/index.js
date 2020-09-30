import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getRandomInt } from 'utils/helpers';
import { useWindowDimensions } from 'utils/hooks';

const Wrapper = styled(motion.div)`
  @keyframes move {
    0% {
      top: 0;
      left: 0;
    }
    100% {
      top: ${props => props.top}px;
      left: ${props => props.left}px;
    }
  }

  width: 120px;
  height: 120px;
  background-color: ${props => props.color};
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 200px;
  left: 200px;
  animation: 1s ease-out 0s 1 move;

  &:nth-child(even) {
    margin-top: 40px;
  }
`;

const Particle = ({ text }) => {
  const [color, setColor] = useState('');
  const { height, width } = useWindowDimensions();

  const getNewPosition = () => {
    var newHeight = Math.floor(Math.random() * height - 100);
    var newWidth = Math.floor(Math.random() * width - 100);
    return [newWidth, newHeight];
  };

  useEffect(() => {
    setColor(`rgb(
        ${getRandomInt(255)},
        ${getRandomInt(255)},
        ${getRandomInt(255)}
      )`);
  }, []);

  return (
    <Wrapper
      onAnimationEnd={() => console.log('I done')}
      top={`${getNewPosition()[0]}`}
      left={`${getNewPosition()[0]}`}
      color={color}
    >
      {text || 'Text'}
    </Wrapper>
  );
};

export default Particle;
