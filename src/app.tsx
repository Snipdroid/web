import React, { FC } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Router } from './router';

export const App: FC = () => {
  return (
    <NextUIProvider>
      <Router />
    </NextUIProvider>
  );
};
