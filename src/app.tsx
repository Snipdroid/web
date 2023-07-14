import React, { FC } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Counter } from '@/components/counter/counter';

export const App: FC = () => {
  return (
    <NextUIProvider>
      <Counter />
    </NextUIProvider>
  );
};
