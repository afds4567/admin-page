import styled from 'styled-components';
import Grid from '../common/Grid';
import { Outlet } from 'react-router-dom';
import GNB from './Gnb';
import { DBProvider } from '../../context/DbSelectContext';

const RootLayout = () => {
  return (
    <DBProvider>
      <Grid
        gridTemplateRows="50px auto"
        height="100vh"
        gridGap="10px"
        gridTemplateAreas="'header' 'main'"
      >
        <GNB />
        <Main>
          <Outlet />
        </Main>
      </Grid>
    </DBProvider>
  );
};

const Main = styled.main`
  grid-area: main;
  background-color: yellowgreen;
  display: grid;
  height: 100%;
  grid-template-columns: 30% auto;
  grid-template-areas: 'sideBar mainContent';
  overflow: scroll;
`;
export default RootLayout;
