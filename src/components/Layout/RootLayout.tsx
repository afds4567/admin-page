import styled from 'styled-components';
import Grid from '../common/Grid';
import { Outlet } from 'react-router-dom';
import GNB from './Gnb';

const RootLayout = () => {
  return (
    <Grid
      height="100vh"
      gridTemplateRows="50px auto"
      gridGap="10px"
      gridTemplateAreas="'header' 'main'"
    >
      <GNB />
      <Main>
        <Outlet />
      </Main>
    </Grid>
  );
};

const Main = styled.main`
  grid-area: main;
  background-color: yellowgreen;
  display: grid;
  grid-template-columns: 30% auto;
  grid-template-areas: 'sideBar mainContent';
  overflow: scroll;
`;
export default RootLayout;
