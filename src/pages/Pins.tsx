import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../components/Layout/MainLayout';

const Pin = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>핀을 로딩 중입니다...</div>}>
        <MainLayout url="https://mapbefine.kro.kr/api/topics" title="핀관리" />
      </Suspense>
    </ErrorBoundary>
  );
};
export default Pin;
