import React from 'react';
import { Box } from '@material-ui/core';
import { BulletTagListProps } from '../types';
import BulletTagItem from './BulletTagItem';

const BulletTagList = (props: BulletTagListProps) => {
  return (
    <Box display={'flex'} paddingLeft={0.5}>
      {props.tagList.map((t, i) => (
        <Box paddingRight={0.5}>
          <BulletTagItem 
            key={i}
            tagName={t.name} />
        </Box>
      ))}
    </Box>
  );
};

export default BulletTagList;