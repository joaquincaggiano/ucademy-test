import * as ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router';

import App from './app/app';
import { LoadingStyled } from './styles/ui/loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingStyled>Cargando...</LoadingStyled>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
