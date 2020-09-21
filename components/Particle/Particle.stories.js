import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particle from './';
import { getRandomInt } from 'utils/helpers';

export default {
  title: 'Site/Particle',
  component: Particle,
};

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const list = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    y: 500,
    transition: {
      when: 'afterChildren',
    },
  },
};

const item = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
    // scale: [1, 1.1, 1],
    // y: [0, getRandomInt(30), 0],
    // transition: {
    //   duration: 3,
    //   ease: 'easeInOut',
    //   loop: Infinity,
    // },
  },
  hidden: { opacity: 1, x: 0 },
};

const randomText = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

export const SimpleParticle = () => {
  return (
    <Wrapper>
      <Particle text="Hi!" />
    </Wrapper>
  );
};

// export const ParticlesForPortfolio = () => {
//   const wrapperRef = useRef(null);
//   let count = 0;
//   return (
//     <Wrapper
//       ref={wrapperRef}
//       initial="hidden"
//       animate="visible"
//       variants={list}
//     >
//       {randomText.map((text, i) => {
//         if (i % 2 === 0) {
//           count = count + 1;
//         }
//         return (
//           <Particle
//             wrapperRef={wrapperRef}
//             variants={{
//               ...item,
//               visible: {
//                 ...item.visible,
//                 y: item.visible.y - 30 * count,
//               },
//             }}
//             text={text}
//           />
//         );
//       })}
//     </Wrapper>
//   );
// };
