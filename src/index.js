import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JawadAuthControllerProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient()
root.render(
  <QueryClientProvider client={client}>
    <JawadAuthControllerProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </JawadAuthControllerProvider>
  </QueryClientProvider>
);
