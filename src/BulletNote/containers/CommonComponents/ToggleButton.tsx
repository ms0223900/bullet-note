import React, { useCallback } from 'react';
import { Box, Button } from '@material-ui/core';
import { ToggleButtonProps } from './types';
import useToggle from 'BulletNote/functions/useToggle';

const ToggleButton = (props: ToggleButtonProps) => {
  const {
    toggleFns,
    toggleEls,
  } = props;

  const {
    toggle,
    handleToggle
  } = useToggle(false);

  const handleClick = useCallback(() => {
    handleToggle();
    toggle ? toggleFns[0]() : toggleFns[1]();
  }, [handleToggle, toggle, toggleFns]);
  
  return (
    <Button
      {...props}
      onClick={handleClick}
    >
      {toggle ? toggleEls[0] : toggleEls[1]}
    </Button>
  );
};

export default ToggleButton;