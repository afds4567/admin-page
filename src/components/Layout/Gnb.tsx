import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  grid-area: header;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: black;
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.selected ? 'red' : 'white')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  &:hover {
    color: ${(props) => (props.selected ? 'red' : 'gray')};
  }
`;

const menu = [
  { name: 'Home', address: '/' },
  { name: '회원관리', address: '/members' },
  { name: '토픽', address: '/topics' },
  { name: '핀', address: '/pins' }
];

const GNB = () => {
  const location = useLocation();

  return (
    <Nav>
      {menu.map((item, index) => (
        <StyledLink key={index} to={item.address} selected={location.pathname === item.address}>
          {item.name}
        </StyledLink>
      ))}
    </Nav>
  );
};

export default GNB;
