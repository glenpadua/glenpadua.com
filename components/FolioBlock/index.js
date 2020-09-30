import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Tag from 'components/Tag';

const Wrapper = styled(motion.div)`
  background-color: #fff;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-bottom: 20px;

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
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: 1.5em;
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
  padding: 2px;
  padding-bottom: 4px;
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

const FolioBlock = ({ title, tags, links, children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <Close onClick={() => setOpen(false)} />
        </motion.div>
      )}
      <Wrapper
        variants={getVariants()}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        onClick={() => setOpen(true)}
        isOpen={isOpen}
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
            <Title>{title}</Title>
            {links &&
              isOpen &&
              links.map(link => (
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
            {tags.map(tag => (
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
