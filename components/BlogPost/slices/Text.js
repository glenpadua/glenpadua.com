import React from 'react';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from 'prismic-configuration';
import { customLink } from 'utils/helpers';

const Wrapper = styled.div`
  font-weight: 300;
  font-size: 1em;
  align-self: flex-start;
  line-height: 1.5;
  p {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.8em;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5em;
    font-weight: 400;
    margin-bottom: 0.8rem;
  }

  pre {
    font-family: monospace, Monaco;
    font-size: 13px;
    line-height: 24px;
    background: #1d2230;
    padding: 10px 12px;
    color: #fff;
    border-radius: 4px;
    margin: 15px 0;
  }

  ul {
    margin-left: 30px;
    margin-bottom: 2rem;

    li {
      margin-bottom: 5px;
    }
  }

  strong {
    font-weight: 400;
  }
`;

/**
 * Text slice component
 */
const Text = ({ slice }) => (
  <Wrapper>
    <RichText
      render={slice.primary.text}
      linkResolver={linkResolver}
      serializeHyperlink={customLink}
    />
  </Wrapper>
);

export default Text;
