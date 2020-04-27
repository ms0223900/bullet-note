import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Callback } from 'common-types';

export const RemoveTagItem = ({
  tag,
  onClick
}: {
  tag: string,
  onClick?: Callback
}) => {
  return (
    <Box padding={0.5} display={'inline-block'}>
      <Box
        key={tag}
        padding={0.5}
        display={'flex'}
        alignItems={'center'}
        color={'default'}
        style={{
          borderRadius: 100,
          backgroundColor: '#eee',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <Typography>{tag}</Typography>
        <Clear
          style={{
            opacity: 0.4
          }}
        />
      </Box>
    </Box>
  );
};

export default RemoveTagItem;