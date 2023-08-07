import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import { Upload } from '@carbon/icons-react';
import ExpandableSearch from '@carbon/react/lib/components/ExpandableSearch/ExpandableSearch'
import { debounce } from 'lodash';
import { store } from '@/store';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const setSearchValue = store.use.setSearchValue();
  const { t } = useTranslation();

  const onSearchValueChange = useMemo(() => {
    return debounce((evt: { target: HTMLInputElement; type: 'change' }) => {
      setSearchValue(evt.target.value);
    }, 300);
  }, []);

  return (
    <div className="w-screen flex justify-center border-solid border-b border-[#E0E0E0]">
      <div className="h-12 box-border flex flex-justify-between items-center w-300">
        <div className="h-8 w-45 flex flex-justify-between items-center">
          <div className="h-8 w-8">
            <img className="h-8 w-8" src="favicon.ico" alt="" />
          </div>
          <div className="h-9 w-[123px] flex justify-center items-center text-7 font-400 ml-4 mr-4">
            {t('projectName')}
          </div>
        </div>
        <div className="h12 flex-1 flex flex-justify-end">
          <ExpandableSearch
            size="lg"
            id={'search_input'}
            placeholder="Name, package, activity"
            labelText={''}
            onChange={onSearchValueChange}
          ></ExpandableSearch>
        </div>
        <div className="h12 flex">
          <Button hasIconOnly={true} kind='ghost'>
            <Upload />
          </Button>
          <Button className="w-20" kind="ghost">
            Sign up
          </Button>
          <Button className="w-[115px]" kind="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
