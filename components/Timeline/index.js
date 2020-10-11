import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  &:after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
`;

const Item = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  display: flex;
  left: ${props => (props.left ? '0' : '50%')};

  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: white;
    border: 4px solid #ff9f55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    ${props =>
      props.right &&
      css`
        left: -16px;
      `}
  }

  &::before {
    content: ' ';
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    border: medium solid white;
    border-width: ${props =>
      props.left ? '10px 0 10px 10px' : '10px 10px 10px 0'};
    border-color: ${props =>
      props.left
        ? 'transparent transparent transparent white'
        : 'transparent white transparent transparent'};
    ${props =>
      props.left
        ? css`
            right: 30px;
          `
        : css`
            left: 30px;
          `}
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: white;
  position: relative;
  border-radius: 6px;
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 1em;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-weight: 300;
  font-size: 0.8em;
  line-height: 1.4;
`;

const Date = styled.div`
  position: absolute;
  top: 24px;
  ${props =>
    props.left
      ? css`
          left: -95px;
        `
      : css`
          right: -95px;
        `}
  font-size: 0.85em;
  opacity: 0.5;
`;

const Timeline = ({ items }) => (
  <Wrapper>
    {items.map((item, i) => (
      <React.Fragment>
        <Item left={i % 2 === 0} right={i % 2 !== 0}>
          <Content>
            <Title>{item.title}</Title>
            <Text>{item.desc}</Text>
          </Content>
          <Date right={i % 2 === 0} left={i % 2 !== 0}>
            {item.date}
          </Date>
        </Item>
      </React.Fragment>
    ))}
  </Wrapper>
);

export default Timeline;
