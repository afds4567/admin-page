import styled from 'styled-components';
import useFetch, { fetchData } from '../hooks/useFetch';
import DefaultImage from '../assets/DefaultImage.png';
import parseDate from '../utils/parseDate';
import { DEFAULT_URL } from '../constants/constant';
import { TopicDetail } from '../types/topic';
import { useDBContext } from '../context/DbSelectContext';

interface TopicDetailComponentProps {
  topicId: string;
}

const TopicDetailComponent: React.FC<TopicDetailComponentProps> = ({ topicId }) => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/topics/${topicId}`;

  const topicDetail = useFetch<TopicDetail>(fetchData, url);

  const onImageError = (e: any) => {
    e.target.src = DefaultImage;
  };

  if (!topicDetail) return <div>토픽 정보가 없습니다.</div>;
  const { name, creator, updatedAt, image, description, pinCount } = topicDetail;
  const { year, month, day } = parseDate(updatedAt);

  const onClickImageDelete = async (topicId: any) => {
    // 이미지 삭제 API 호출
    const deleteUrl = `${selectedUrl}/admin/topics/${topicId}/images`;
    try {
      await fetchData(deleteUrl, 'DELETE');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TopicContainer>
      <Header>
        <h2>{name}</h2>
        <p>작성자: {creator}</p>
        <p>생성일: {`${year}년 ${month}월 ${day}일`}</p>
      </Header>
      <TopicImage src={image || DefaultImage} alt={name} onError={onImageError} />
      <DeleteButton onClick={() => onClickImageDelete(topicId)}>이미지 삭제</DeleteButton>
      <ContentContainer>
        <p>{description}</p>
        <p>핀 개수: {pinCount}</p>
      </ContentContainer>
    </TopicContainer>
  );
};

const TopicContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  height: 50vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  h2 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }
`;

const TopicImage = styled.img`
  width: 100%;
  height: 50%;
  max-height: 60%;
`;

const DeleteButton = styled.button`
  width: 100%;
  height: 10%;
  border: none;
  border-radius: 10px;
  background-color: #09eb0c;
  cursor: pointer;
  &:hover {
    background-color: #ccfac6;
  }
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

export default TopicDetailComponent;
