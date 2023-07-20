import { Counter } from '@/components/counter/counter';
import { LangSelector } from '@/components/lang-selector/lang-selector';
import { LatinToy } from '@/components/latin-toy/latin-toy';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from '@carbon/react';
import { useAppInfoList } from '@/data';
import { debounce } from 'lodash';
// import useSWR from 'swr';

export const Home: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, size, setSize } = useAppInfoList(searchValue, 10);

  const onInput = debounce((evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  }, 250);

  const { t } = useTranslation();
  return (
    <>
      <div className="bg-lightBlue pl-10">
        <h1>{t('projectName')}</h1>
        <Counter />
        <LangSelector />
        <LatinToy />
      </div>
      <div className="mx2">
        <TextInput
          id="noop"
          labelText={''}
          type={'text'}
          className="my2 w-[200px]"
          onChange={onInput}
        ></TextInput>
        {data?.map((response, page) => {
          return response.items.map((item) => {
            return (
              <div key={item.id}>
                {item.appName}, {item.packageName}
              </div>
            );
          });
        })}
        <div className="mt2">
          <Button
            onClick={() => {
              setSize(size + 1);
            }}
          >
            load more
          </Button>
        </div>
      </div>
    </>
  );
};
