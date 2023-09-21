import styled from 'styled-components';
import Grid from '../common/Grid';
import { Outlet } from 'react-router-dom';
import GNB from './Gnb';
import { DBProvider } from '../../context/DbSelectContext';

const RootLayout = () => {
  return (
    <DBProvider>
      <Grid
        padding="1rem"
        gridTemplateRows="50px auto"
        height="100vh"
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
  background-color: black;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 30% auto;
  grid-template-areas: 'sideBar mainContent';
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  // Firefox
  scrollbar-width: none;
`;
export default RootLayout;
