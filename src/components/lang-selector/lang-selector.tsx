import { Dropdown } from '@nextui-org/react';
import React, { FC, Key } from 'react';
import { useTranslation } from 'react-i18next';

export const LangSelector: FC = () => {
  const { i18n } = useTranslation();

  function setLanguage(lang: Key) {
    i18n.changeLanguage(lang as string);
  }

  return (
    <Dropdown>
      <Dropdown.Button flat>Translation</Dropdown.Button>
      <Dropdown.Menu aria-label="Languages" onAction={setLanguage}>
        <Dropdown.Item key="en">English</Dropdown.Item>
        <Dropdown.Item key="zh">简体中文</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
