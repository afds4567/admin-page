/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';

import App from './App';
import GlobalStyle from './GlobalStyle';

const root = createRoot(document.getElementById('app')!);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
