import styled from 'styled-components';

export const MainNav = styled.ul`
  list-style: none;
  color: #000;
  display: flex;
  font-size: 1em;

  @media only screen and (max-width: 600px) {
    display: none;
  }

  li {
    margin-right: 30px;
    margin-bottom: 0px;

    &:after {
      background-color: #000;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
