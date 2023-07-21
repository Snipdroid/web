import React, { FC } from 'react';
import { Header } from '@/components/layout/header';
import { Content } from '@/components/layout/content';
import { AppInfoTable } from './components/app-info-table';
import { DetailPanel } from './components/detail-panel';

export const Home: FC = () => {
  return (
    <>
      <Header />
      <Content>
        <div className="flex justify-between mt-[50px]">
          <AppInfoTable />
          <DetailPanel />
        </div>
      </Content>
    </>
  );
};
