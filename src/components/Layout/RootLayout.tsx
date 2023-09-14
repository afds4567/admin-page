import styled from 'styled-components';
import Grid from '../common/Grid';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <Grid
      height="100vh"
      gridTemplateColumns="200px 1fr"
      gridTemplateRows="100px auto"
      gridGap="10px"
      gridTemplateAreas="'header header' 'sidebar main'"
    >
      <Header>Header Area</Header>
      <Sidebar>sideBar</Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Grid>
  );
};

const Header = styled.header`
  grid-area: header;
  background-color: red;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: blue;
`;

const MainContent = styled.main`
  grid-area: main;
  background-color: yellowgreen;
`;
export default RootLayout;
