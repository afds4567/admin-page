import { DEFAULT_URL } from '../constants/constant';
import { useDBContext } from '../context/DbSelectContext';
import useFetch, { fetchData } from '../hooks/useFetch';
import { MemberDetail } from '../types/member';
import parseDate from '../utils/parseDate';
import { DetailContainer, DetailImage, Header } from './DetailLayout';

interface MemberDetailComponentProps {
  memberId: string;
}

const MemberDetailComponent = ({ memberId }: MemberDetailComponentProps) => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/members/${memberId}`;

  const memberDetail = useFetch<MemberDetail>(fetchData, url);

  if (!memberDetail) return <div>멤버 정보가 없습니다.</div>;
  const { nickName, email, imageUrl, updatedAt } = memberDetail;
  const { year, month, day } = parseDate(updatedAt);

  return (
    <DetailContainer>
      <Header>
        <h2>{nickName}</h2>
        <p>이메일: {email}</p>
        <p>생성일: {`${year}년 ${month}월 ${day}일`}</p>
      </Header>
      <DetailImage height={'60%'} src={imageUrl} alt={nickName} />
    </DetailContainer>
  );
};

export default MemberDetailComponent;
