import React, { FC, PropsWithChildren } from 'react';

interface LayoutProps {}

export const Content: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <div className="w-screen flex justify-center">
      <div className="min-w-300 w-auto">{children}</div>
    </div>
  );
};
