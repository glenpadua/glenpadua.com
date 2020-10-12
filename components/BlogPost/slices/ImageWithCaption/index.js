import React from 'react';
import Caption from './Caption';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 500px;
`;

/**
 * Default image component
 */
const ImageWithCaption = ({ slice }) => {
  const imageUrl = slice.primary.image.url;
  const imageAlt = slice.primary.image.alt;
  const caption = slice.primary.caption;

  return (
    <Wrapper>
      <Image src={imageUrl} alt={imageAlt} />
      <Caption caption={caption} />
    </Wrapper>
  );
};

export default ImageWithCaption;
