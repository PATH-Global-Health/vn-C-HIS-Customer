import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from '@app/hooks';
import { setAppMenu } from '@app/slices/global';

const DefaultLayout: React.FC<{
  children: ReactNode;
}> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppMenu(false));
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default DefaultLayout;
