import { Dropdown, OnChangeData } from '@carbon/react';
import React, { FC, Key } from 'react';
import { useTranslation } from 'react-i18next';

type DropdownItem = {
  id: string;
  label: string;
};

export const LangSelector: FC = () => {
  const { i18n } = useTranslation();

  const langOptions: DropdownItem[] = [
    {
      id: 'en',
      label: 'English',
    },
    {
      id: 'zh',
      label: '简体中文',
    },
  ];

  function setLanguage(data: OnChangeData<DropdownItem>) {
    i18n.changeLanguage(data.selectedItem?.id);
  }

  return (
    <div style={{ width: '200px' }}>
      <Dropdown
        id="lang-selector"
        items={langOptions}
        label="Translation"
        onChange={setLanguage}
      />
    </div>
  );
};
