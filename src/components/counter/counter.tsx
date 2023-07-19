import { Button } from '@carbon/react';
import React, { FC, useState } from 'react';

import styles from './counter.module.scss';
import { store } from '@/store';
import { Asterisk } from '@carbon/icons-react';

export const Counter: FC = () => {
  const count = store.use.count();
  const inc = store.use.inc();
  const dec = store.use.dec();
  return (
    <div className={styles.counter}>
      <Button
        onClick={() => {
          dec();
        }}
      >
        -
      </Button>
      {[...new Array(Math.max(0, count))].map((_, index) => (
        <Asterisk size="32" color={'deeppink'} key={index} />
      ))}
      <Button
        onClick={() => {
          inc();
        }}
      >
        +
      </Button>
    </div>
  );
};
