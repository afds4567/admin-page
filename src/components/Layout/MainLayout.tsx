/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { createRef, RefObject, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { DEFAULT_URL } from '../../constants/constant';
import { useDBContext } from '../../context/DbSelectContext';
import useFetch, { fetchData } from '../../hooks/useFetch';
import { Member } from '../../types/member';
import { Pin } from '../../types/pin';
import { Topic } from '../../types/topic';

interface Props {
  url: string;
  title: string;
  children?: React.ReactNode;
}

type Item = Topic | Member | Pin;
type Items = Topic[] | Member[] | Pin[];

const MainLayout = ({ url, title, children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  // get id from url
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];

  const items = useFetch<Items>(fetchData, url);
  const id = location.search.split('?')[1];
  const [selectedItem, setSelectedItem] = useState<Item>();

  const refs: Record<number, RefObject<HTMLLIElement>> = (items ?? []).reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {} as Record<number, RefObject<HTMLLIElement>>);

  useEffect(() => {
    const itemFromUrl = items?.find((item) => item.id === Number(id));

    if (itemFromUrl) {
      setSelectedItem(itemFromUrl);
    }
  }, [items, id]);

  useEffect(() => {
    // Scroll to the selected item
    selectedItem &&
      refs[selectedItem.id].current?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest'
      });
  }, [selectedItem]);

  const onClickItem = (item: Item) => {
    setSelectedItem(item);
    const urlWithId = `${location.pathname}?${item?.id}`;
    navigate(urlWithId);
  };

  const onClickDelete = async (item: Item) => {
    // 삭제 API 호출
    const deleteUrl = `${selectedUrl}/admin${location.pathname}/${item?.id}`;
    try {
      await fetchData(deleteUrl, selectedDB, 'DELETE');
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
              ref={refs[item.id]}
              key={item.id}
              selected={selectedItem?.id === item.id}
              onClick={() => onClickItem(item)}
            >
              {'nickName' in item ? item.nickName : item.name}
              <div>
                <DeleteButton onClick={async () => await onClickDelete(item)}>삭제</DeleteButton>
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
  background-color: #000;

  overflow-y: auto;
  // Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }

  // Firefox
  scrollbar-width: none;

  // IE and Edge
  -ms-overflow-style: none;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 1rem;
  color: white;
`;

export const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.selected ? '#f39c12' : '#000')};
  color: #ecf0f1;

  padding: 10px;
  margin: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.selected ? 'yellow' : '#e0e0e0')};
  }
`;

export const ListContainer = styled.ul`
  background-color: #000;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContent = styled.div`
  grid-area: mainContent;
  background-color: #000;
  height: 100%;
  overflow-y: auto;
  // Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }

  // Firefox
  scrollbar-width: none;

  // IE and Edge
  -ms-overflow-style: none;
`;

export const DeleteButton = styled.button`
  padding: 0.5em 0.75em;
  color: #ffffff;
  background-color: #dc3545;
  border-radius: 0.25rem;
  border: none;

  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #c82333;
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.2) -1px -1px, rgba(255, 255, 255, 0.7) 1px -1px,
      rgba(255, 255, 255, 0.7) -1px -2px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default MainLayout;
