import React from 'react';
import styled from 'styled-components';
import Haikyuu from '../../assets/haikyuu.png';

const Overlay = styled.div`
  width: 115px;
  position: absolute;
  height: 115px;
  border-radius: 50%;
  background: rgba(241, 147, 0, 0.8);
  top: 50px;
  left: 143px;
  z-index: 0;
  transition: transform 0.3s ease-out;
`;

const Circle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-out;
  z-index: 1;

  &:after {
    content: '';
    width: 115px;
    height: 115px;
    display: block;
    position: absolute;
    background: rgba(241, 147, 0, 0.8);
    border-radius: 50%;
    transition: opacity 0.3s ease-out;
  }
`;

const Title = styled.h3`
  margin: 0;
  z-index: 1000;
  transition: color 0.3s ease-out;
`;

const Card = styled.div`
  width: 100%;
  padding: 20px 10px;
  background: #fff;
  color: #4c5656;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-out;
  position: relative;

  &:hover {
    background: rgba(241, 147, 0, 0.8);
    translateY(-5px) scale(1.005) translateZ(0);

    ${Overlay} {
      transform: scale(5) translateZ(0);
    }

    ${Circle} {
      background: rgba(241, 147, 0, 0.8);

      &:after {
        background: rgba(241, 147, 0, 0.5);
      }
    }

    ${Title} {
      color: #fff;
      text-shadow: 1px 1px 4px #000000;
    }
  }
`;

const Emoji = styled.span`
  font-size: 50px;
  z-index: 1000;
`;

const Info = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const AboutCard = () => {
  return (
    <Card>
      <Title>CURRENTLY WATCHING</Title>
      <Overlay />
      <Circle>
        <Emoji role="img" aria-label="television">
          📺
        </Emoji>
      </Circle>

      <Info>
        <img src={Haikyuu} width="50%" />
      </Info>
    </Card>
  );
};

export default AboutCard;
