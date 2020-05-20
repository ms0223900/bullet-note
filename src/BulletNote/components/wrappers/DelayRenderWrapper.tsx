import React from 'react';
import { DelayRenderWrapperProps } from './types';
import { CircularProgress } from '@material-ui/core';

const defaultRenderTimeout = 10;

export const useDelayRender = (delayTimeout: number, initShouldRender=false) => {
  const [shouldRender, setRender] = React.useState(initShouldRender);

  React.useEffect(() => {
    const renderTimeout = setTimeout(() => {
      setRender(true);
    }, delayTimeout);
    
    // return clearTimeout(renderTimeout);
  }, [delayTimeout]);

  return ({
    shouldRender,
    setRender,
  });
};

const DelayRenderWrapper = (props: DelayRenderWrapperProps) => {
  const {
    initShouldRender,
    delayTimeout=defaultRenderTimeout,
    children,
  } = props;

  const {
    shouldRender,
  } = useDelayRender(delayTimeout, initShouldRender);
  // console.log(shouldRender);

  return (
    <>
      {shouldRender ? children : (
        <CircularProgress />
      )}
    </>
  );
};

export default DelayRenderWrapper;