import { useState } from 'react';
import useFetch, { fetchData } from '../../hooks/useFetch';
import styled from 'styled-components';
import { Topic } from '../../types/topic';
import { Member } from '../../types/member';
import { Pin } from '../../types/pin';

type Props = {
  url: string;
  title: string;
  children?: React.ReactNode;
};

type Item = Topic | Member | Pin;
type Items = Topic[] | Member[] | Pin[];

const MainLayout = ({ url, title, children }: Props) => {
  const items = useFetch<Items>(fetchData, url);
  const [selectedItem, setSelectedItem] = useState<Item>();

  const onClickItem = (item: Item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <SideBar>
        <PageTitle>{title}</PageTitle>
        <ListContainer>
          {items?.map((item) => (
            <ListItem key={item.id} onClick={() => onClickItem(item)}>
              {'nickName' in item ? item.nickName : item.name}
            </ListItem>
          ))}
        </ListContainer>
      </SideBar>
      <MainContent>
        {selectedItem ? <div>{selectedItem.id}</div> : <div>선택하세요</div>}
        {children}
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
