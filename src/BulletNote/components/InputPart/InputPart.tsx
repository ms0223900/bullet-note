import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { InputPartProps } from './types';

const InputPart = (props: InputPartProps) => {
  const {
    value,
    onChange,
    onSendMessage
  } = props;

  return (
    <Box display={'flex'} paddingTop={1}>
      <TextField
        autoFocus={true}
        variant={'outlined'}
        fullWidth={true}
        value={value}
        onChange={onChange} />
      <Box paddingLeft={1}>
        <Button onClick={onSendMessage}>
          {'send'}
        </Button>
      </Box>
    </Box>
  );
};

export default InputPart;