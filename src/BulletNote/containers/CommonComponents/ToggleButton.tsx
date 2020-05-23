import React, { useCallback } from 'react';
import { Box, Button } from '@material-ui/core';
import { ToggleButtonProps } from './types';
import useToggle from 'lib/customHooks/useToggle';

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
    <Box display={'inline-block'} paddingRight={1}>
      <Button
        {...props}
        onClick={handleClick}
      >
        {toggle ? toggleEls[0] : toggleEls[1]}
      </Button>
    </Box>
  );
};

export default ToggleButton;