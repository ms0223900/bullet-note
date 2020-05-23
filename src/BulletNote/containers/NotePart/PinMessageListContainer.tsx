import React from 'react';
import { Box } from '@material-ui/core';
import PinMessageList from 'BulletNote/components/NotePart/PinMessageList';
import { PinMessageListContainerProps } from './types';
import useToggle from 'lib/customHooks/useToggle';

const PinMessageListContainer = (props: PinMessageListContainerProps) => {
  const {
    toggle,
    handleToggle,
  } = useToggle();

  return (
    <PinMessageList
      {...props}
      isShowPinMessageList={toggle}
      toggleShowPinMessageListFn={handleToggle}
    />
  );
};

export default PinMessageListContainer;