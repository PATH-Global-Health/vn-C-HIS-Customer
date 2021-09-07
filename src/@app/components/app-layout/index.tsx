import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from '@app/hooks';
import { setAppMenu } from '@app/slices/global';

const AppLayout: React.FC<{
  children: ReactNode;
}> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppMenu(true));
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default AppLayout;
