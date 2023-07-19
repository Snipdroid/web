import { Counter } from '@/components/counter/counter';
import { LangSelector } from '@/components/lang-selector/lang-selector';
import { LatinToy } from '@/components/latin-toy/latin-toy';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-lightBlue pl-10">
      <h1>{t('projectName')}</h1>
      <Counter />
      <LangSelector />
      <LatinToy />
    </div>
  );
};
