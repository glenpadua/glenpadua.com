import React from 'react';
import styled from 'styled-components';
import Timeline from './';

export default {
  title: 'Site/Timeline',
  component: Timeline,
};

const Wrapper = styled.div`
  width: 100%;
`;

const items = [
  {
    title: 'Discovered Web Dev',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum placerat turpis, ac scelerisque tortor mollis a. Nulla at enim eu augue iaculis vehicula nec ut orci.',
    date: 'May 2013',
  },
  {
    title: 'First Website',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum placerat turpis, ac scelerisque tortor mollis a. Nulla at enim eu augue iaculis vehicula nec ut orci.',
    date: 'Jun 2014',
  },
];

export const Basic = () => (
  <Wrapper>
    <Timeline items={items} />
  </Wrapper>
);
