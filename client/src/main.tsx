import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Base } from "@thirdweb-dev/chains";

import { StateContextProvider, ThemeProvider } from './context';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThirdwebProvider activeChain={Base} clientId='5ac749a03d5dbb535ab5e0d46890b9cb'>
    <Router>
      <ThemeProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </ThemeProvider>
    </Router>
  </ThirdwebProvider>
);