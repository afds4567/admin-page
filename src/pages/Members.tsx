import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../components/Layout/MainLayout';

const Members = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout url="https://mapbefine.kro.kr/api/topics" title="회원관리" />
      </Suspense>
    </ErrorBoundary>
  );
};
export default Members;
