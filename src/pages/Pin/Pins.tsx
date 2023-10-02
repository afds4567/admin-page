import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary';
import MainLayout from '../../components/Layout/MainLayout';
import { DEFAULT_URL } from '../../constants/constant';
import { useDBContext } from '../../context/DbSelectContext';
import PinDetailComponent from './PinDetail';

const Pin = () => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/pins`;
  const location = useLocation();
  const pinId = location.search.slice(1); // '6'
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>핀을 로딩 중입니다...</div>}>
        <MainLayout url={url} title="핀관리">
          <Suspense fallback={<div>상세정보를 로딩 중입니다...</div>}>
            {pinId ? <PinDetailComponent pinId={pinId} /> : <></>}
          </Suspense>
        </MainLayout>
      </Suspense>
    </ErrorBoundary>
  );
};
export default Pin;
