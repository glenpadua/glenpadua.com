import React from 'react';
import styled, { css } from 'styled-components';

const sizeMapping = {
  small: `
        width: 60px;
        height: 60px;

        h2 {
            font-size: 1em;
            margin-left: 5px;
        }
    `,
  medium: `
    width: 100px;
    height: 100px;

    h2 {
        font-size: 1.3em;
        margin-left: 20px;
    }
  `,
  large: `
    width: 120px;
    height: 120px;

    h2 {
        font-size: 1.5em;
        margin-left: 25px;
    }
  `,
};

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;

  ${props =>
    css`
      ${sizeMapping[props.size]}
    `}
`;

const Text = styled.h2`
  font-family: 'Zapfino', sans-serif;
  color: #fff;
  font-weight: bold;
`;

const Logo = ({ size = 'medium' }) => (
  <Wrapper size={size}>
    <Text>GP</Text>
  </Wrapper>
);

export default Logo;
