import useFetch, { fetchData } from '../hooks/useFetch';
import DefaultImage from '../assets/DefaultImage.png';
import parseDate from '../utils/parseDate';
import { DEFAULT_URL } from '../constants/constant';
import { TopicDetail } from '../types/topic';
import { useDBContext } from '../context/DbSelectContext';
import { ContentContainer, DetailContainer, DetailImage, Header } from './DetailLayoutStyle';
import { DeleteButton } from './Layout/MainLayout';

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
      await fetchData(deleteUrl, selectedDB, 'DELETE');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DetailContainer>
      <Header>
        <h2>{name}</h2>
        <p>작성자: {creator}</p>
        <p>생성일: {`${year}년 ${month}월 ${day}일`}</p>
      </Header>
      <DetailImage imgHeight="50vh" src={image || DefaultImage} alt={name} onError={onImageError} />
      <DeleteButton onClick={() => onClickImageDelete(topicId)}>이미지 삭제</DeleteButton>
      <ContentContainer>
        <p>{description}</p>
        <p>핀 개수: {pinCount}</p>
      </ContentContainer>
    </DetailContainer>
  );
};

export default TopicDetailComponent;
