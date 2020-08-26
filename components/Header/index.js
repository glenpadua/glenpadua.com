import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2``;

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
  padding: 0;
`;

const Item = styled.li`
  padding: 0 10px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>Glen Padua</Title>
      <Menu>
        <Item>About Me</Item>
        <Item>Stuff I Know</Item>
        <Item>Stuff I've Done</Item>
        <Item>Stuff I Like</Item>
        <Item>Blog</Item>
        <Item>Snippets</Item>
      </Menu>
    </Wrapper>
  );
};

export default Header;