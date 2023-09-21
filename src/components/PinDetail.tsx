import useFetch, { fetchData } from '../hooks/useFetch';
import { Pin } from '../types/pin';
import parseDate from '../utils/parseDate';
import DefaultImage from '../assets/DefaultImage.png';

import {
  ContentContainer,
  DeleteButton,
  DetailContainer,
  DetailImage,
  Header,
  PositionContainer
} from './DetailLayout';
import { useDBContext } from '../context/DbSelectContext';
import { DEFAULT_URL } from '../constants/constant';

interface PinDetailComponentProps {
  pinId: string;
}

const PinDetailComponent = ({ pinId }: PinDetailComponentProps) => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/pins/${pinId}`;

  const pinDetail = useFetch<Pin>(fetchData, url);

  if (!pinDetail) return <div>핀 정보가 없습니다.</div>;
  const {
    id,
    name,
    address,
    description,
    creator,
    latitude,
    longitude,
    canUpdate,
    updatedAt,
    images
  } = pinDetail;

  const onImageError = (e: any) => {
    e.target.src = DefaultImage;
  };
  const { year, month, day } = parseDate(updatedAt);
  const onClickImageDelete = async (pinId: any) => {
    // 이미지 삭제 API 호출
    const deleteUrl = `${selectedUrl}/pins/${pinId}/images`;
    try {
      await fetchData(deleteUrl, 'DELETE');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DetailContainer>
      <Header>
        <h2>{name}</h2>
        <p>생성자: {creator}</p>
      </Header>
      {images?.length !== 0 ? (
        images.map((image) => (
          <DetailImage
            key={image.id}
            src={image.imageUrl || DefaultImage}
            alt="주황치마다빈치"
            onError={onImageError}
          />
        ))
      ) : (
        <DetailImage src={DefaultImage} />
      )}

      {images.length !== 0 && (
        <DeleteButton onClick={() => onClickImageDelete(pinId)}>이미지 삭제</DeleteButton>
      )}

      <ContentContainer>
        <p>주소: {address}</p>
        <PositionContainer>
          <p>위도: {latitude}</p>
          <p>경도: {longitude}</p>
        </PositionContainer>
        <p>생성일: {`${year}년 ${month}월 ${day}일`}</p>
        <p>설명: {description}</p>
      </ContentContainer>
    </DetailContainer>
  );
};

export default PinDetailComponent;
