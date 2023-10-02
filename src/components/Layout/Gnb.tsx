import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useDBContext } from '../../context/DbSelectContext';

const menu = [
  { name: 'Home', address: '/' },
  { name: '회원관리', address: '/members' },
  { name: '토픽', address: '/topics' },
  { name: '핀', address: '/pins' }
];

const GNB = () => {
  const location = useLocation();
  const { selectedDB, handleDBChange } = useDBContext();
  return (
    <Nav>
      <Logo>괜찮을지도</Logo>
      <MenuContainer>
        {menu.map((item, index) => (
          <StyledLink key={index} to={item.address} selected={location.pathname === item.address}>
            {item.name}
          </StyledLink>
        ))}
        <select onChange={handleDBChange} value={selectedDB}>
          <option value="dev">배포서버</option>
          <option value="prod">운영서버</option>
        </select>
      </MenuContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  grid-area: header;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #03080e;
`;

const Logo = styled.h1`
  color: #f39c12;
  font-size: 1.5rem;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 2rem;
  }
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.selected ? '#f39c12' : '#ecf0f1')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};

  &:hover {
    color: ${(props) => (props.selected ? '#f39c12' : '#bdc3c7')};
  }
`;

export default GNB;
