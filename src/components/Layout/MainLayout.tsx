import { useState } from 'react';
import useFetch, { fetchData } from '../../hooks/useFetch';
import styled from 'styled-components';

type Props = {
  url: string;
  title: string;
};

const MainLayout = ({ url, title }: Props) => {
  const items = useFetch(fetchData, url);
  const [selectedItem, setSelectedItem] = useState<any>();

  const onClickItem = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <>
      <SideBar>
        <PageTitle>{title}</PageTitle>
        <ListContainer>
          {items?.map((item: any) => (
            <ListItem key={item.id} onClick={() => onClickItem(item)}>
              {item.name}
            </ListItem>
          ))}
        </ListContainer>
      </SideBar>
      <MainContent>
        {selectedItem ? <div>{selectedItem.name}</div> : <div>선택하세요</div>}
      </MainContent>
    </>
  );
};

export const SideBar = styled.div`
  grid-area: sideBar;
  padding: 1rem;
  height: 100%;
  overflow-y: scroll;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

export const ListItem = styled.li`
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ListContainer = styled.ul`
  background-color: aliceblue;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContent = styled.div`
  grid-area: mainContent;
  background-color: beige;
`;

export default MainLayout;
