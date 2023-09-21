import { DEFAULT_URL } from '../constants/constant';
import { useDBContext } from '../context/DbSelectContext';
import useFetch, { fetchData } from '../hooks/useFetch';
import { MemberDetail } from '../types/member';
import parseDate from '../utils/parseDate';
import {
  DetailContainer,
  DetailImage,
  Header,
  Tag,
  TagContainer,
  Title
} from './DetailLayoutStyle';

interface MemberDetailComponentProps {
  memberId: string;
}

const MemberDetailComponent = ({ memberId }: MemberDetailComponentProps) => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/admin/members/${memberId}`;

  const memberDetail = useFetch<MemberDetail>(fetchData, url);

  if (!memberDetail) return <div>멤버 정보가 없습니다.</div>;
  const { nickName, email, imageUrl, updatedAt, topics } = memberDetail;
  const { year, month, day } = parseDate(updatedAt);

  return (
    <DetailContainer>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>
            {nickName} ({email})
          </h2>
          <div>생성일: {`${year}년 ${month}월 ${day}일`}</div>
        </div>
      </Header>
      <DetailImage imgHeight={'60vh'} src={imageUrl} alt={nickName} />
      <Title>만든 지도 목록</Title>
      <TagContainer>
        {topics?.map((topic) => (
          <Tag key={topic.id}>{topic.name}</Tag>
        ))}
      </TagContainer>
    </DetailContainer>
  );
};

export default MemberDetailComponent;
