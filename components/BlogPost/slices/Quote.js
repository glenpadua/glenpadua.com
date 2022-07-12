import React from 'react';
import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const BlockQuote = styled.blockquote`
  font-size: 1.2em;
  width: 100%;
  margin: 50px auto;
  color: #555555;
  font-style: italic;
  padding: 1.2em 30px 1.2em 75px;
  border-left: 8px solid #78c0a8;
  line-height: 1.6;
  position: relative;
  background: #ededed;

  &::after {
    content: '';
  }

  &::before {
    font-family: Arial;
    content: '\\201C';
    color: #78c0a8;
    font-size: 3em;
    position: absolute;
    left: 10px;
    top: -10px;
  }
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
