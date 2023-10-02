import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Chart } from '../components/Chart';
import Grid from '../components/common/Grid';
import { DEFAULT_URL } from '../constants/constant';
import { useDBContext } from '../context/DbSelectContext';
import useFetch, { fetchData } from '../hooks/useFetch';
import { Member } from '../types/member';
import { Pin } from '../types/pin';
import { isMember, isPin, isTopic, SearchResult } from '../types/search';
import { Topic } from '../types/topic';
import { countFromSpecificDate } from '../utils/countMember';

const Home = () => {
  const navigate = useNavigate();
  const { selectedDB } = useDBContext();
  const searchTermRef = useRef('');

  const [isAutoCompleting, setIsAutoCompleting] = useState(false);

  const [searchTarget, setSearchTarget] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);

  const selectedUrl = DEFAULT_URL[selectedDB];
  useEffect(() => {
    if (searchTerm !== '') {
      setSelectedResultIndex(0);
    }
  }, [searchTerm, selectedDB]);

  const membersData = useFetch<Member[]>(fetchData, `${selectedUrl}/admin/members`);
  const pinsData = useFetch<Pin[]>(fetchData, `${selectedUrl}/pins`);
  const topicsData = useFetch<Topic[]>(fetchData, `${selectedUrl}/topics`);

  const autoCompleteResults: SearchResult[] = useMemo(() => {
    let results;
    switch (searchTarget) {
      case 'members':
        results = membersData?.filter((member) => member.nickName.includes(searchTerm));
        break;
      case 'pins':
        results = pinsData?.filter((pin) =>
          pin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'topics':
        results = topicsData?.filter((topic) =>
          topic.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        results = [];
    }
    if (searchTerm === '') return [];
    if (searchTerm === results?.[0]?.nickName) return [];
    else if (searchTerm === results?.[0]?.name) return [];

    return results ?? [];
  }, [searchTarget, searchTerm]);

  const onChangeSearchTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTarget(e.target.value);
  };

  const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAutoCompleting) {
      setSearchTerm(e.target.value);
    }
  };

  const onClickSearchButton = () => {
    console.log(searchTerm);
    navigate(`/${searchTarget}?${autoCompleteResults[selectedResultIndex].id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResultIndex((prev) => Math.min(prev + 1, autoCompleteResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResultIndex((prev) => Math.max(prev - 1, 0));
    } else if (
      e.key === 'Enter' &&
      selectedResultIndex >= 0 &&
      autoCompleteResults?.length > selectedResultIndex
    ) {
      e.preventDefault();
      const selectedResult = autoCompleteResults[selectedResultIndex];
      searchTermRef.current = isMember(selectedResult)
        ? selectedResult.nickName
        : selectedResult.name;
      console.log(searchTermRef.current);

      setIsAutoCompleting(true);

      setSearchTerm(searchTermRef.current);
      setSelectedResultIndex(-1);
      setIsAutoCompleting(false);

      navigate(`/${searchTarget}?${selectedResult.id}`);
    }
  };
  const onResultClick = (result: SearchResult) => {
    setSearchTerm(isMember(result) ? result.nickName : result.name);
    setSelectedResultIndex(0);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid
        padding="1rem"
        gridTemplateRows="52px auto"
        gridTemplateAreas="'searchBar' 'dashBoard'"
        width="100vw"
      >
        <SearchBarWrapper>
          <SearchSelect name="searchType" onChange={onChangeSearchTarget}>
            <option value="members">회원</option>
            <option value="pins">핀</option>
            <option value="topics">토픽</option>
          </SearchSelect>
          <div style={{ position: 'relative', width: '50%' }}>
            <SearchInput
              type="text"
              value={searchTerm}
              placeholder="검색어를 입력하세요"
              onChange={onChangeSearchTerm}
              onKeyDown={onKeyDown}
            />
            {autoCompleteResults?.length > 0 && (
              <AutoCompleteList
                results={autoCompleteResults}
                selectedResultIndex={selectedResultIndex}
                onResultClick={onResultClick}
              />
            )}
          </div>
          <SearchButton onClick={onClickSearchButton}>검색</SearchButton>
        </SearchBarWrapper>

        <DashBoard>
          대시보드
          <h1>총 회원 수 : {membersData?.length}</h1>
          <h1>10/2일부터 모인 회원 수 : {countFromSpecificDate(membersData ?? [], 2023, 10, 2)}</h1>
          <Chart data={membersData ?? []} startDaysAgo={7} />
        </DashBoard>
      </Grid>
    </Suspense>
  );
};

const AutoCompleteList = ({
  results,
  selectedResultIndex,
  onResultClick
}: {
  results: SearchResult[];
  selectedResultIndex: number;
  onResultClick: (result: SearchResult) => void;
}) => {
  return (
    <AutoCompleteWrapper>
      {results.map((result, index) => (
        <div
          key={result.id}
          onClick={() => onResultClick(result)}
          style={{ backgroundColor: index === selectedResultIndex ? '#ccc' : '#fff' }}
        >
          {isPin(result) && result.name}
          {isMember(result) && result.nickName}
          {isTopic(result) && result.name}
        </div>
      ))}
    </AutoCompleteWrapper>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  grid-area: searchBar;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
`;

const SearchSelect = styled.select`
  border: none;
  outline: none;
  padding: 5px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const AutoCompleteWrapper = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
`;

const DashBoard = styled.div`
  grid-area: dashBoard;

  width: 100vw;

  background-color: #625656;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Home;
