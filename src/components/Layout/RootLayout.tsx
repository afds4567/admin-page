import styled from 'styled-components';
import Grid from '../common/Grid';
import { Outlet } from 'react-router-dom';
import GNB from './Gnb';

const RootLayout = () => {
  return (
    <Grid
      height="100vh"
      gridTemplateColumns="200px 1fr"
      gridTemplateRows="50px auto"
      gridGap="10px"
      gridTemplateAreas="'header header' 'sidebar main'"
    >
      <GNB />
      <Sidebar>sideBar</Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Grid>
  );
};

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: blue;
`;

const MainContent = styled.main`
  grid-area: main;
  background-color: yellowgreen;
`;
export default RootLayout;
