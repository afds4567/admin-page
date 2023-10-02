import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary';
import MainLayout from '../../components/Layout/MainLayout';
import { DEFAULT_URL } from '../../constants/constant';
import { useDBContext } from '../../context/DbSelectContext';
import MemberDetailComponent from './MemberDetail';

const Members = () => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/admin/members`;
  const location = useLocation();
  const memberId = location.search.slice(1); // '6'
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout url={url} title="회원관리">
          <Suspense fallback={<div>상세정보를 로딩 중입니다...</div>}>
            {memberId ? <MemberDetailComponent memberId={memberId} /> : <></>}
          </Suspense>
        </MainLayout>
      </Suspense>
    </ErrorBoundary>
  );
};
export default Members;
