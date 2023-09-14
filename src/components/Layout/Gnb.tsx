import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  grid-area: header;
  justify-content: space-around;
  padding: 1rem;
  background-color: black;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    color: gray;
  }
`;

const menu = [
  { name: 'Home', address: '/' },
  { name: '회원관리', address: '/members' },
  { name: '토픽', address: '/topics' },
  { name: '핀', address: '/pins' }
];

const GNB = () => {
  return (
    <Nav>
      {menu.map((item, index) => (
        <StyledLink key={index} to={item.address}>
          {item.name}
        </StyledLink>
      ))}
    </Nav>
  );
};

export default GNB;
