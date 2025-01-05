import * as ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router';

import App from './app/app';
import { ContainerLoading, Loader } from './styles/ui/loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <ContainerLoading>
            <Loader $width="40px" $height="40px" $borderWidth="4px" />
          </ContainerLoading>
        }
      >
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
