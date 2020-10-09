import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SiGithub, SiStorybook, SiNpm } from 'react-icons/si';
import { FaGlobe } from 'react-icons/fa';

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
  line-height: 1.5;
  margin-bottom: 15px;
`;

export const List = styled.ul`
  font-size: 0.85em;
  font-weight: 300;
  margin: 0;
  padding-left: 15px;
  line-height: 1.5;

  li {
    margin-bottom: 5px;
  }
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
    title: 'My Website',
    tags: [
      {
        name: 'NextJS',
        color: '#5ed3f2',
      },
      {
        name: 'Prismic',
        color: '#5163ba',
      },
      {
        name: 'GraphQL',
        color: '#de34a5',
      },
      {
        name: 'framer-motion',
        color: '#181818',
      },
    ],
    links: [
      {
        icon: <SiGithub />,
        url: 'https://github.com/glenpadua/glenpadua.com',
      },
    ],
    children: (
      <React.Fragment>
        <Section initial={initialDefault} animate={getAnimateValues()}>
          <Para>
            A clean modern single page website built with the JAMstack to
            showcase my portfolio. It also gives an insight into my life and
            thoughts in the form of a blog and smaller snippets.
          </Para>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1)}>
          <SubHeading>What I Brought</SubHeading>
          <List>
            <li>
              Designed the whole site from scratch with Sketch with the idea of
              combining my personality with the UI elements on display.
            </li>
            <li>
              Custom blog using Prismic as the headless CMS and consuming it
              using Apollo GraphQL.
            </li>
          </List>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1.5)}>
          <SubHeading>Key Takeaways</SubHeading>
          <List>
            <li>
              Learnt to use amazing libraries like framer-motion for simple
              declarative animations.
            </li>
            <li>
              A personal website is the best way to iteratively try out cool new
              things.
            </li>
          </List>
        </Section>
      </React.Fragment>
    ),
  },
  {
    id: 3,
    title: 'Synup',
    tags: [
      {
        name: 'React',
        color: '#5ed3f2',
      },
      {
        name: 'Redux',
        color: '#764abc',
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
    links: [
      {
        icon: <FaGlobe />,
        url: 'http://synup.com/',
      },
    ],
    children: (
      <React.Fragment>
        <Section initial={initialDefault} animate={getAnimateValues()}>
          <Para>
            Frontend Engineer in a team at Synup building a product which serves
            as a digital profile and reputation management solution serving over
            100k+ SMBs and Enterprises.
          </Para>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1)}>
          <SubHeading>What I Brought</SubHeading>
          <List>
            <li>
              Encouraged the team to follow a component driven development
              approach using Storybook.
            </li>
            <li>
              Improved codebase with with setting up pre-commit hooks to check
              for linting and building out a coding standards document.
            </li>
          </List>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1.5)}>
          <SubHeading>Key Takeaways</SubHeading>
          <List>
            <li>Learnt to work with legacy React code and GraphQL.</li>
            <li>Learnt how to work following the Agile methodology.</li>
          </List>
        </Section>
      </React.Fragment>
    ),
  },
  {
    id: 4,
    title: 'Noleggiocampi',
    tags: [
      {
        name: 'React',
        color: '#5ed3f2',
      },
      {
        name: 'Redux',
        color: '#764abc',
      },
      {
        name: 'Storybook',
        color: '#ff4785',
      },
      {
        name: 'styled-components',
        color: '#3d3d3d',
      },
    ],
    links: [
      {
        icon: <FaGlobe />,
        url: 'https://noleggia.noleggiocampi.it/noleggia ',
      },
    ],
    children: (
      <React.Fragment>
        <Section initial={initialDefault} animate={getAnimateValues()}>
          <Para>
            A customized online sports rental system that allowed users to pick
            and choose various components as required for various sports such as
            volleyball and football which would then be brought over and set up
            for them.
          </Para>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1)}>
          <SubHeading>What I Brought</SubHeading>
          <List>
            <li>
              Built the entire frontend as a Progressive Web App that persisted
              state in Local Storage.
            </li>
            <li>
              Built out a custom configurator where users could add and remove
              components they needed which would then be visually reflected on
              the UI.
            </li>
          </List>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1.5)}>
          <SubHeading>Key Takeaways</SubHeading>
          <List>
            <li>
              Learnt to build out components in isolation using a component
              driven development approach with Storybook.
            </li>
            <li>Learnt the quirks of CSS for custom emails.</li>
          </List>
        </Section>
      </React.Fragment>
    ),
  },
  {
    id: 5,
    title: 'Mi Alma',
    tags: [
      {
        name: 'E-commerce',
        color: 'green',
      },
      {
        name: 'React',
        color: '#5ed3f2',
      },
      {
        name: 'Redux',
        color: '#764abc',
      },
      {
        name: 'Stripe',
        color: '#7a73ff',
      },
      {
        name: 'Paypal',
        color: '#266fbb',
      },
    ],
    children: (
      <React.Fragment>
        <Section initial={initialDefault} animate={getAnimateValues()}>
          <Para>
            A modern SPA e-commerce store built for a smooth user experience,
            for an Italian sandal company complete with a custom dashboard to
            manage orders, inventory, tax, shipping information and much more.
          </Para>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1)}>
          <SubHeading>What I Brought</SubHeading>
          <List>
            <li>
              Built the entire frontend with fluid responsive design along with
              pixel perfect renditions of the mockups.
            </li>
            <li>
              Built a Cart functionality made from a persistent Redux store.
            </li>
          </List>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1.5)}>
          <SubHeading>Key Takeaways</SubHeading>
          <List>
            <li>
              Learnt about the intricacies of integrating Payment gateways like
              Stripe and PayPal.
            </li>
            <li>
              Learnt to implement an i18n system to switch between languages.
            </li>
          </List>
        </Section>
      </React.Fragment>
    ),
  },
  {
    id: 6,
    title: 'New Faces',
    tags: [
      {
        name: 'CRM',
        color: 'brown',
      },
      {
        name: 'React',
        color: '#5ed3f2',
      },
      {
        name: 'Redux',
        color: '#764abc',
      },
      {
        name: 'Sass',
        color: '#cf6499',
      },
    ],
    children: (
      <React.Fragment>
        <Section initial={initialDefault} animate={getAnimateValues()}>
          <Para>
            A full-fledged CRM for an Italian talent management agency to manage
            their entire flow of clients from their journey as leads all the way
            to managing their functions as students of the agency.
          </Para>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1)}>
          <SubHeading>What I Brought</SubHeading>
          <List>
            <li>
              Played a part in architecting the application and interface
              through multiple iterations while learning and building out the
              entire frontend with React and Redux.
            </li>
            <li>
              Built out custom features like a rules engine, customized search
              filter, activity logging, just to name a few.
            </li>
          </List>
        </Section>
        <Section initial={initialDefault} animate={getAnimateValues(1.5)}>
          <SubHeading>Key Takeaways</SubHeading>
          <List>
            <li>
              Learnt how to plan for a large scale project and split work into
              phases of completion.
            </li>
            <li>
              Learnt that using a design framework like Material UI is not
              always the best option.
            </li>
          </List>
        </Section>
      </React.Fragment>
    ),
  },
];
