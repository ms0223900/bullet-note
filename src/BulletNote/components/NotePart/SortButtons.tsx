import React from 'react';
import { Box } from '@material-ui/core';
import ToggleButton from 'BulletNote/containers/CommonComponents/ToggleButton';
import { ToggleButtonProps } from 'BulletNote/containers/CommonComponents/types';
import { SortButtonsProps } from './types';

const sortByStarNumsEls = ['star(asc)', 'star(desc)'] as ToggleButtonProps['toggleEls'];

const SortButtons = (props: SortButtonsProps) => {
  const {
    sortByStarNumsFn,
  } = props;

  return (
    <Box>
      <ToggleButton 
        toggleFns={[
          sortByStarNumsFn('asc'),
          sortByStarNumsFn('desc'),
        ]}
        toggleEls={sortByStarNumsEls}
      />
    </Box>
  );
};

export default SortButtons;