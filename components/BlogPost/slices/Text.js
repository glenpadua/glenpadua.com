import React from 'react';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from 'prismic-configuration';
import { customLink } from 'utils/helpers';

const Wrapper = styled.div`
  font-weight: 300;
  font-size: 1.15em;
  align-self: flex-start;
  line-height: 1.5;
  p {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2em;
    font-weight: 500;
    margin-bottom: 1rem;
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
