import React from 'react';
import { Box } from '@material-ui/core';
import useToggle from 'BulletNote/functions/useToggle';
import { PinItemContainerProps } from '../types';
import { Flag, FlagOutlined } from '@material-ui/icons';

const PinItemContainer = ({
  isPin,
  onChange
}: PinItemContainerProps) => {
  const {
    toggle: isPined,
    handleToggle
  } = useToggle(isPin, onChange);

  return (
    <Box
      style={{
        cursor: 'pointer',
      }}
      onClick={handleToggle}
    >
      {isPined ? (
        <Flag />
      ) : (
        <FlagOutlined />
      )}
    </Box>
  );
};

export default PinItemContainer;