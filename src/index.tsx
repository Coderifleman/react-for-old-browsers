import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from './App';

import './styles/style.scss';

const rootElement = document.createElement('div');
rootElement.className = '__ROOT__';
document.body.appendChild(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
