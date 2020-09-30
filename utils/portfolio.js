import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SiGithub, SiStorybook, SiNpm } from 'react-icons/si';

export const Section = styled(motion.section)`
  margin-top: 20px;
`;

export const SubHeading = styled.h3`
  font-weight: 500;
  font-size: 1.1em;
  margin-bottom: 10px;
`;

export const Para = styled.p`
  font-size: 0.85em;
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 15px;
`;

export const List = styled.ul`
  font-size: 0.85em;
  font-weight: 300;
  margin: 0;
  padding-left: 15px;
  line-height: 1.4;
`;

const initialDefault = {
  opacity: 0,
  y: 20,
};

const getAnimateValues = (delay = 0.5) => {
  return {
    opacity: 1,
    y: 0,
    transition: {
      delay,
    },
  };
};

export const portfolioItems = [
  {
    id: 1,
    title: 'Uncommon UI',
    tags: [
      {
        name: 'Open Source',
        color: 'black',
      },
      {
        name: 'React',
        color: '#5ed3f2',
      },
      {
        name: 'Storybook',
        color: '#ff4785',
      },
      {
        name: 'Lerna',
        color:
          'linear-gradient( 40deg, #00fff0 0%, #677ef8 50%, #cc00ff 100% );',
      },
    ],
    links: [
      {
        icon: <SiGithub />,
        url: 'https://github.com/Zephony/uncommon-ui',
      },
      {
        icon: <SiStorybook />,
        url: 'https://zephony.github.io/uncommon-ui/',
      },
      {
        icon: <SiNpm />,
        url: 'https://www.npmjs.com/org/uncommonui',
      },
    ],
    children: (
      <React.Fragment>
        <Section initial={initialDefault} animate={getAnimateValues()}>
          <Para>
            An open source React component library that will contain everything
            from standard UI components which will serve as building blocks to
            building more experimental ones that push the boundaries of UI/UX.
          </Para>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1)}>
          <SubHeading>What I Brought</SubHeading>
          <List>
            <li>
              Set up a monorepo with <b>Lerna</b> allowing for every component
              to be published as it's own individual package.
            </li>
            <li>
              Built out each of the UI components while writing tests and
              stories for each of them.
            </li>
            <li>
              Set up contribution guidelines with precommit hooks and continuous
              integration with Circle CI.
            </li>
          </List>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1.5)}>
          <SubHeading>Key Takeways</SubHeading>
          <List>
            <li>
              An understanding of how to properly setup and structure a modern
              component library that can be shared across teams
            </li>
            <li>
              Better understanding of managing an open source repo and adhering
              to high standards for when the contributing community and users of
              the library grows.
            </li>
          </List>
        </Section>
      </React.Fragment>
    ),
  },
  {
    id: 2,
    title: 'Synup',
    tags: [
      {
        name: 'React',
        color: '#5ed3f2',
      },
      {
        name: 'GraphQL',
        color: '#de34a5',
      },
      {
        name: 'styled-components',
        color: '#3d3d3d',
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
