import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import ToggleButton from 'BulletNote/containers/CommonComponents/ToggleButton';
import { ToggleButtonProps } from 'BulletNote/containers/CommonComponents/types';
import { SortButtonsProps } from './types';
import { Star, ArrowDownward, ArrowUpward, DateRangeOutlined, AlarmOutlined } from '@material-ui/icons';
import { otherColors } from 'BulletNote/theme/theme';

const sortByStarNumsEls = [
  <>
    <Star 
      style={{
        fill: otherColors.starPart,
      }}
    />
    <ArrowDownward />
  </>, 
  <>
    <Star 
      style={{
        fill: otherColors.starPart,
      }}
    />
    <ArrowUpward />
  </>
] as ToggleButtonProps['toggleEls'];

const sortByDateEls = [
  <>
    <DateRangeOutlined 
      style={{
        fill: '#333',
      }}
    />
    <ArrowUpward />
  </>, 
  <>
    <DateRangeOutlined 
      style={{
        fill: '#333',
      }}
    />
    <ArrowDownward />
  </>
] as ToggleButtonProps['toggleEls'];

const sortByDueDateEls = [
  <>
    <AlarmOutlined 
      style={{
        fill: '#333',
      }}
    />
    <ArrowUpward />
  </>, 
  <>
    <AlarmOutlined 
      style={{
        fill: '#333',
      }}
    />
    <ArrowDownward />
  </>
] as ToggleButtonProps['toggleEls'];

const SortButtons = (props: SortButtonsProps) => {
  const {
    sortByDueDateFn,
    sortByDateFn,
    sortByStarNumsFn,
  } = props;

  const toggleButtonsPropsList: ToggleButtonProps[] = useMemo(() => [
    {
      toggleFns: [
        sortByStarNumsFn('asc'),
        sortByStarNumsFn('desc'),
      ],
      toggleEls: sortByStarNumsEls
    },
    {
      toggleFns: [
        sortByDateFn('asc'),
        sortByDateFn('desc'),
      ],
      toggleEls: sortByDateEls
    },
    {
      toggleFns: [
        sortByDueDateFn('asc'),
        sortByDueDateFn('desc'),
      ],
      toggleEls: sortByDueDateEls
    }
  ], [sortByDateFn, sortByDueDateFn, sortByStarNumsFn]);

  return (
    <Box>
      {toggleButtonsPropsList.map((t, i) => {
        return (
          <ToggleButton 
            key={i}
            variant={'outlined'}
            {...t}
          />
        );
      })}
    </Box>
  );
};

export default SortButtons;