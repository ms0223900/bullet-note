import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { StarItemContainerProps } from '../types';
import useToggle from 'lib/customHooks/useToggle';

const StarItemContainer = ({
  onChange,
  starLevelNum,
}: StarItemContainerProps) => {
  const {
    toggle: isStar,
    handleToggle,
  } = useToggle(starLevelNum, onChange);

  return (
    <Box
      style={{
        cursor: 'pointer',
      }}
      onClick={handleToggle}
    >
      {isStar ? (
        <Star />
      ) : (
        <StarBorder />
      )}
    </Box>
  );
};

export default StarItemContainer;