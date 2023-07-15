import { Home } from '@/pages/home/home';
import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
