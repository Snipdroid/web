import { Button } from '@nextui-org/react';
import React, { FC, useState } from 'react';

import styles from './counter.module.less';
import { store } from '@/store';
import { FaAsterisk } from 'react-icons/fa';

export const Counter: FC = () => {
  const count = store.use.count();
  const inc = store.use.inc();
  const dec = store.use.dec();
  return (
    <div className={styles.counter}>
      <Button
        auto
        onClick={() => {
          dec();
        }}
      >
        -
      </Button>
      {[...new Array(count)].map((index) => (
        <FaAsterisk size="50" color={'deeppink'} key={index} />
      ))}
      <Button
        auto
        onClick={() => {
          inc();
        }}
      >
        +
      </Button>
    </div>
  );
};
