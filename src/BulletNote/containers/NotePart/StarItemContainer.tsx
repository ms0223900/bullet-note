import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { StarItemContainerProps } from '../types';
import useToggle from 'BulletNote/functions/useToggle';

const StarItemContainer = ({
  onChange,
  isStared,
}: StarItemContainerProps) => {
  const {
    toggle: isStar,
    handleToggle,
  } = useToggle(isStared, onChange);

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