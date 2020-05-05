import React, { useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import StarLevel from 'BulletNote/components/CommonComponents/StarLevel';
import { StarLevelContainerProps } from './types';
import { AddOrMinus } from 'BulletNote/components/CommonComponents/types';

const StarLevelContainer = (props: StarLevelContainerProps) => {
  const {
    initStarLevelNum,
    setStarLevelNumToCtx,
  } = props;

  const [starLevelNum, setStarLevel] = React.useState(initStarLevelNum || 0);

  const handleAdd = useCallback(() => {
    setStarLevel(s => s + 1);
  }, []);

  const handleMinus = useCallback(() => {
    setStarLevel(s => {
      const newStarLevel = s - 1;
      if(newStarLevel < 0) {
        return 0;
      }
      return newStarLevel;
    });
  }, []);

  const handleAddOrMinus = useCallback((addMinus: AddOrMinus) => {
    return () => {
      if(addMinus === 'add') {
        handleAdd();
      } else {
        handleMinus();
      }
    };
  }, [handleAdd, handleMinus]);

  useEffect(() => {
    setStarLevelNumToCtx && setStarLevelNumToCtx(starLevelNum);
  }, [setStarLevelNumToCtx, starLevelNum]);

  return (
    <StarLevel 
      starLevelNum={starLevelNum}
      onAddOrMinus={handleAddOrMinus}
    />
  );
};

export default StarLevelContainer;