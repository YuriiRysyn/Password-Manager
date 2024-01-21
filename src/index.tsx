import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './Store/store';

import App from './components/App';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);
