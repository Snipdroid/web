import React, { FC, useState } from 'react';
import { TextInput, Button } from '@carbon/react';
import styles from './latin-toy.module.scss';
import { latinify } from '@/utils/latinify';

export const LatinToy: FC = () => {
  const [originText, setOriginText] = useState('');
  const [trasText, setTransText] = useState('');

  function transformText() {
    setTransText(latinify(originText));
  }

  return (
    <div className={styles.latinToy}>
      <TextInput
        style={{ width: '250px' }}
        value={originText}
        labelText=""
        placeholder="原始字符串"
        id={'appNameInput'}
        onChange={(v) => setOriginText(v.target.value)}
      />
      <TextInput
        value={trasText}
        style={{ width: '250px' }}
        id={'appNameOutput'}
        placeholder="转换后的字符串"
        readOnly
        labelText=""
      />
      <Button onClick={transformText}>转换</Button>
    </div>
  );
};
