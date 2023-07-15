import { Counter } from '@/components/counter/counter';
import { LangSelector } from '@/components/lang-selector/lang-selector';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('projectName')}</h1>
      <Counter />
      <LangSelector />
    </>
  );
};
