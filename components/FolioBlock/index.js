import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Tag from 'components/Tag';

const Wrapper = styled(motion.div)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-bottom: 30px;

  @media only screen and (min-width: 400px) {
    margin-right: 20px;
  }
  @media only screen and (min-width: 1100px) {
    margin-right: 40px;
  }

  ${props =>
    props.isOpen &&
    css`
      position: absolute;
      justify-content: start;
      align-items: initial;
      padding: 20px;
      z-index: 100;
      cursor: initial;
      margin-right: 0;
    `}
`;

const Close = styled(FaTimes)`
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 20px;
  z-index: 1000;
  cursor: pointer;
`;

const InnerWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3em;
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: 1.4em;
`;

const Icon = styled.a`
  text-decoration: none;
  color: #000;
  padding-left: 10px;
  font-size: 1em;
`;

const Placeholder = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  border-radius: 50%;
  padding: 0;
  display: ${props => (props.isOpen ? 'block' : 'none')};

  @media only screen and (min-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Tags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
`;

const TagWrapper = styled.div`
  padding: 0 3px;
  padding-bottom: 8px;
`;

const getVariants = () => {
  return {
    open: {
      top: 0,
      left: 0,
      width: '100%',
      height: 'auto',
      borderRadius: '0',
      transition: {
        ease: 'easeOut',
        duration: 0.5,
      },
    },
    closed: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      transition: {
        duration: 0.01,
      },
    },
  };
};

const FolioBlock = ({ portfolio, children, setCurrentlyOpen }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setCurrentlyOpen(portfolio.id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentlyOpen(0);
    setOpen(false);
  };
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <Close onClick={handleClose} />
        </motion.div>
      )}
      <Wrapper
        variants={getVariants()}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        isOpen={isOpen}
        whileHover={{ scale: isOpen ? 1 : 1.1 }}
      >
        <InnerWrapper
          variants={{
            open: {
              alignItems: 'initial',
            },
            closed: {
              alignItems: 'center',
            },
          }}
        >
          <Heading>
            <Title>{portfolio.title}</Title>
            {portfolio.links &&
              isOpen &&
              portfolio.links.map(link => (
                <Icon key={link.url} href={link.url} target="_blank">
                  {link.icon}
                </Icon>
              ))}
          </Heading>
          <Tags
            variants={{
              open: {
                justifyContent: 'initial',
              },
              closed: {
                justifyContent: 'center',
              },
            }}
          >
            {portfolio.tags.map(tag => (
              <TagWrapper key={tag.title}>
                <Tag color={tag.color}>{tag.name}</Tag>
              </TagWrapper>
            ))}
          </Tags>
        </InnerWrapper>
        {isOpen && children}
      </Wrapper>
      {/* To take up the space when it's open */}
      <Placeholder isOpen={isOpen} />
    </>
  );
};

export default FolioBlock;
