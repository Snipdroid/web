import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './i18n';

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(React.createElement(App));
} else {
  console.error('dom node not exist');
}