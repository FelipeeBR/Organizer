import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import AppProvider from "./context/AppContext.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


//<React.StrictMode>
//reportWebVitals();
