import React from 'react';
import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const BlockQuote = styled.blockquote`
  margin-bottom: 2rem;
  display: inline-block;
  font-style: italic;
  font-size: 24px;
`;

/**
 * Quote slice component
 */
const Quote = ({ slice }) => (
  <div className="post-part single container">
    <BlockQuote>{RichText.asText(slice.primary.quote)}</BlockQuote>
  </div>
);

export default Quote;
