import { Button } from '@nextui-org/react';
import React, { FC, useState } from 'react';

import styles from './counter.module.less';
import { store } from '@/store';
import { ShieldDone } from 'react-iconly';

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
      <ShieldDone set="bold" primaryColor="blueviolet" />
      {count}
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
