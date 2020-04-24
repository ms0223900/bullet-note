import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { InputPartProps } from './types';
import TagList from './TagList';

const InputPart = (props: InputPartProps) => {
  const {
    value,
    onChange,
    onSendMessage
  } = props;

  return (
    <Box display={'flex'} paddingTop={1}>
      <Box
        position={'relative'}
        width={'100%'}
      >
        <TextField
          autoFocus={true}
          variant={'outlined'}
          fullWidth={true}
          value={value}
          onChange={onChange} />
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <TagList
            {...props} />
        </Box>
      </Box>
      <Box paddingLeft={1}>
        <Button onClick={onSendMessage}>
          {'send'}
        </Button>
      </Box>
    </Box>
  );
};

export default InputPart;