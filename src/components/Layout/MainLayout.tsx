import { useState } from 'react';
import useFetch, { fetchData } from '../../hooks/useFetch';
import styled from 'styled-components';
import { Topic } from '../../types/topic';
import { Member } from '../../types/member';
import { Pin } from '../../types/pin';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_URL } from '../../constants/constant';

type Props = {
  url: string;
  title: string;
  children?: React.ReactNode;
};

type Item = Topic | Member | Pin;
type Items = Topic[] | Member[] | Pin[];

const MainLayout = ({ url, title, children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useFetch<Items>(fetchData, url);
  const [selectedItem, setSelectedItem] = useState<Item>();

  const onClickItem = (item: Item) => {
    setSelectedItem(item);
    const urlWithId = `${location.pathname}?${item?.id}`;
    navigate(urlWithId);
  };

  const onClickDelete = async (item: Item) => {
    // 삭제 API 호출
    const deleteUrl = `${DEFAULT_URL}/admin${location.pathname}/${item?.id}`;
    try {
      await fetchData(deleteUrl, 'DELETE'); // Add await here
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <SideBar>
        <PageTitle>{title}</PageTitle>
        <ListContainer>
          {items?.map((item) => (
            <ListItem
              key={item.id}
              selected={selectedItem?.id == item.id}
              onClick={() => onClickItem(item)}
            >
              {'nickName' in item ? item.nickName : item.name}
              <div>
                <DeleteButton onClick={() => onClickDelete(item)}>삭제</DeleteButton>
              </div>
            </ListItem>
          ))}
        </ListContainer>
      </SideBar>
      <MainContent>{children}</MainContent>
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

export const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.selected ? 'yellow' : '#f0f0f0')};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.selected ? 'yellow' : '#e0e0e0')};
  }
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
  height: 100%;
`;

export const EditButton = styled.button`
  padding: 0.5em 0.75em;
  color: #ffffff;
  background-color: #007bff;
  border-radius: 0.25rem;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #0056b3;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5em 0.75em;
  color: #ffffff;
  background-color: #dc3545;
  border-radius: 0.25rem;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #c82333;
  }
`;
export default MainLayout;
