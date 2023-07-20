import React, { FC } from 'react';
import { Router } from './router';
import { SWRConfig } from 'swr';
import { fetcher } from './data/fetcher';

export const App: FC = () => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Router />
    </SWRConfig>
  );
};
