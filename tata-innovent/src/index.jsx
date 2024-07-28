import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import $ from "jquery"

const root = $('#root')[0]
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)