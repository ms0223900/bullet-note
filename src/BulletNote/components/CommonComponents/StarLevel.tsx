import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Star, StarBorder, Add, Remove } from '@material-ui/icons';
import { StarLevelProps } from './types';

const StarLevel = (props: StarLevelProps) => {
  const {
    starLevelNum,
    onAddOrMinus,
  } = props;
  
  return (
    <Box
      textAlign={'center'}
      style={{
        backgroundColor: '#eee',
      }}
    >
      <Button
        onClick={onAddOrMinus('add')}
      >
        <Add />
      </Button>
      {starLevelNum > 0 ? (
        <>
          <Star />
          {starLevelNum}
        </>
      ) : (
        <StarBorder />
      )}
      <Button
        onClick={onAddOrMinus('minus')}
      >
        <Remove />
      </Button>
    </Box>
  );
};

export default StarLevel;