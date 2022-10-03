import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import { ConfigProvider } from 'antd'
import tr_TR from 'antd/lib/locale/tr_TR';
import { BrowserRouter } from "react-router-dom";
import store from './store/configureStore'
import { Provider } from 'react-redux'
import { IntlProvider } from "react-intl";
import Languages from './translations/index'
import { getLocale } from './helpers/localization/index'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <IntlProvider locale={getLocale()} messages={Languages[getLocale()]}>
    <ConfigProvider locale={tr_TR}>
      <Provider store={store}>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </IntlProvider>

);

reportWebVitals();
