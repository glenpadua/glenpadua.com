import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.li`
  width: 175px;
  height: 275px;
  background: ${props => props.color};
  border-radius: 10px;
  list-style: none;
  position: relative;

  @media only screen and (max-width: 600px) {
    width: 100px;
    height: 170px;
  }

  @media only screen and (min-width: 992px) {
    cursor: pointer;
  }
`;

const LogoTest = styled.div`
  width: 75px;
  height: 75px;
  background-image: url('${props => props.src}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Logo = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
`;

const LogoTop = styled(Logo)`
  position: absolute;
  top: 10px;
  left: 10px;

  @media only screen and (max-width: 600px) {
    left: 5px;
  }
`;

const LogoBottom = styled(Logo)`
  position: absolute;
  bottom: 10px;
  right: 10px;

  @media only screen and (max-width: 600px) {
    right: 5px;
  }
`;

const Text = styled.div`
  font-size: 20px;
  color: #fff;
  writing-mode: vertical-rl;
  letter-spacing: 1.5px;

  @media only screen and (max-width: 600px) {
    font-size: 13px;
    letter-spacing: 0.5px;
  }
`;

const TextTop = styled(Text)`
  position: absolute;
  top: 50px;
  left: 10px;

  @media only screen and (max-width: 600px) {
    top: 40px;
    left: 5px;
  }
`;

const TextBottom = styled(Text)`
  position: absolute;
  bottom: 50px;
  right: 10px;
  transform: rotate(-180deg);

  @media only screen and (max-width: 600px) {
    bottom: 40px;
    right: 5px;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillCard = ({ text, logo, color, onClick }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const cornerLogoDimension = width < 600 ? '20px' : '30px';
  const centerLogoDimension = width < 600 ? '40px' : '80px';
  return (
    <Card color={color} onClick={onClick}>
      <LogoTop
        src={logo}
        width={cornerLogoDimension}
        height={cornerLogoDimension}
      />
      <TextTop>{text}</TextTop>
      <LogoWrapper>
        <Logo
          src={logo}
          width={centerLogoDimension}
          height={centerLogoDimension}
        />
      </LogoWrapper>
      <LogoBottom
        src={logo}
        width={cornerLogoDimension}
        height={cornerLogoDimension}
      />
      <TextBottom>{text}</TextBottom>
    </Card>
  );
};

export default SkillCard;
