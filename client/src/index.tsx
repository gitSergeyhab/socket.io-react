import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { App } from './app/app';


import 'react-toastify/dist/ReactToastify.css';
import 'normalize.css';
import './index.css';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <Provider store={store}>
     <ToastContainer />
    <App />
   </Provider>,
);




