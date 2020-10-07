import React from 'react';
import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const Label = styled.span`
  margin-bottom: 2rem;
  display: inline-block;
  font-style: italic;
  font-size: 1em;
`;

/**
 * Image caption component
 */
const Caption = ({ caption }) => {
  if (RichText.asText(caption) !== '') {
    return (
      <p>
        <Label>{RichText.asText(caption)}</Label>
      </p>
    );
  }

  return null;
};

export default Caption;
