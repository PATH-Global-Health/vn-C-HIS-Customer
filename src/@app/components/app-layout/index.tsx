import React, { ReactNode } from 'react';
import AppMenu from './AppMenu';

const AppLayout: React.FC<{
  children: ReactNode;
}> = (props) => {
  const { children } = props;

  return (
    <>
      <AppMenu />
      {children}
    </>
  );
};

export default AppLayout;
