import React from 'react';
import  ReactDOM  from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Goerli } from "@thirdweb-dev/chains";

import { StateContextProvider } from './context';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
  <ThirdwebProvider activeChain={Goerli} clientId='5ac749a03d5dbb535ab5e0d46890b9cb'>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
)