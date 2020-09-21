import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const transitionDuration = '0.4s';

const Overlay = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color};
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  transition: transform ${transitionDuration} ease-out;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all ${transitionDuration} ease-out;
  z-index: 1;
`;

const Title = styled.h3`
  font-weight: 500;
  margin: 0;
  padding: 0 10px;
  z-index: 1000;
  transition: color ${transitionDuration} ease-out;
`;

const Icon = styled.span`
  font-size: 40px;
  z-index: 1000;
  color: white;
  height: 40px;
  transition: all ${transitionDuration};
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const Card = styled(motion.div)`
  width: 100%;
  height: 250px;
  padding-top: 20px;
  padding-bottom: 0;
  background: #fff;
  color: #4c5656;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
  transition: all ${transitionDuration} ease-out;
  position: relative;

  &:hover {
    background: ${props => props.color};
    transform: translateY(-5px) scale(1.005) translateZ(0);

    ${Overlay} {
      transform: scale(8) translateZ(0);
    }

    ${Title} {
      color: #fff;
    }

    ${Info} {
      color: #fff;
    }

    ${Icon} {
      font-size: 50px;
    }
  }
`;

const Info = styled.div`
  z-index: 1000;
  margin-bottom: 30px;
  padding: 0 10px;
  text-align: center;
  font-weight: 300;
`;

const AboutCard = ({ title, icon, info, color, link, href }) => {
  const getAboutContent = () => (
    <Card color={color} initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Title>{title}</Title>
      <Overlay color={color} />
      <Circle color={color}>
        <Icon>{icon}</Icon>
      </Circle>
      <Info>{info}</Info>
    </Card>
  );

  return link ? (
    <Link href={link}>
      <a>{getAboutContent()}</a>
    </Link>
  ) : (
    <a href={href} target="_blank">
      {getAboutContent()}
    </a>
  );
};

export default AboutCard;
