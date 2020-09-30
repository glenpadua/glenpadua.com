import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FolioBlock from './';

export default {
  title: 'Site/Portfolio Block',
  component: FolioBlock,
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Section = styled(motion.section)`
  margin-top: 20px;
`;

const SubHeading = styled.h3`
  font-weight: 500;
  font-size: 1.1em;
  margin-bottom: 10px;
`;

const Para = styled.p`
  font-size: 0.85em;
  font-weight: 300;
`;

const portfolio = [
  {
    id: 1,
    title: 'Uncommon UI',
    tags: [
      {
        name: 'Open Source',
        color: 'green',
      },
      {
        name: 'React',
        color: 'dodgerblue',
      },
      {
        name: 'styled-components',
        color: 'tomato',
      },
    ],
    children: (
      <Section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
          },
        }}
      >
        <SubHeading>Test</SubHeading>
        <Para>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro
          repellat culpa aliquid in eos alias voluptas? At in sit asperiores
          reprehenderit? Nesciunt natus rerum vel itaque quod, praesentium in!
        </Para>
      </Section>
    ),
  },
  {
    id: 2,
    title: 'Synup',
    tags: [
      {
        name: 'Open Source',
        color: 'green',
      },
      {
        name: 'React',
        color: 'dodgerblue',
      },
      {
        name: 'styled-components',
        color: 'tomato',
      },
    ],
    children: (
      <Section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
          },
        }}
      >
        <SubHeading>Test</SubHeading>
        <Para>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro
          repellat culpa aliquid in eos alias voluptas? At in sit asperiores
          reprehenderit? Nesciunt natus rerum vel itaque quod, praesentium in!
        </Para>
      </Section>
    ),
  },
];

// const activeVariants = {
//   open: {
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100vh',
//     borderRadius: '0',
//     transition: {
//       ease: 'easeOut',
//       duration: 0.5,
//     },
//   },
//   closed: {
//     width: '140px',
//     height: '140px',
//     borderRadius: '50%',
//     transition: {
//       ease: 'easeOut',
//       duration: 0.5,
//     },
//   },
// };

// const inactiveVariants = {
//   open: {
//     scale: 0,
//   },
//   closed: {
//     scale: 1,
//   },
// };

export const Basic = () => {
  // const [currentOpen, setOpen] = useState(0);
  return (
    <Wrapper>
      {portfolio.map(portfolio => (
        <FolioBlock
          key={portfolio.id}
          title={portfolio.title}
          tags={portfolio.tags}
          // onClick={() =>
          //   setOpen(currentOpen === portfolio.id ? 0 : portfolio.id)
          // }
          // isOpen={portfolio.id === currentOpen}
        >
          {portfolio.children}
        </FolioBlock>
      ))}
    </Wrapper>
  );
};
