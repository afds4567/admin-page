import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../components/Layout/MainLayout';
import { useLocation } from 'react-router-dom';
import TopicDetailComponent from '../components/TopicDetail';
import { useDBContext } from '../context/DbSelectContext';
import { DEFAULT_URL } from '../constants/constant';

const Topic = () => {
  const { selectedDB } = useDBContext();
  const selectedUrl = DEFAULT_URL[selectedDB];
  const url = `${selectedUrl}/topics`;
  const location = useLocation();
  const topicId = location.search.slice(1); // '6'

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>토픽을 로딩 중입니다...</div>}>
        <MainLayout url={url} title="토픽관리">
          <Suspense fallback={<div>상세정보를 로딩 중입니다...</div>}>
            {topicId ? <TopicDetailComponent topicId={topicId} /> : <></>}
          </Suspense>
        </MainLayout>
      </Suspense>
    </ErrorBoundary>
  );
};
export default Topic;
