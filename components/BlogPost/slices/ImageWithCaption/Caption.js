import React from 'react';
import { PrismicText } from '@prismicio/react';
import styled from 'styled-components';

const Label = styled.span`
  margin-bottom: 2rem;
  margin-top: 1rem;
  display: inline-block;
  font-style: italic;
  font-size: 1em;
  opacity: 0.4;
`;

/**
 * Image caption component
 */
const Caption = ({ caption }) => {
  return (
    <p>
      <Label>
        <PrismicText field={caption} />
      </Label>
    </p>
  );
};

export default Caption;
