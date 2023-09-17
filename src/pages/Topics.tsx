import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../components/Layout/MainLayout';

const Topic = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>토픽을 로딩 중입니다...</div>}>
        <MainLayout url="https://mapbefine.kro.kr/api/topics" title="토픽관리" />
      </Suspense>
    </ErrorBoundary>
  );
};
export default Topic;
