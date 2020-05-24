import React from 'react';
import { Box, TextField, Button, TextareaAutosize, makeStyles } from '@material-ui/core';
import { InputPartProps } from './types';
import TagList from './TagList';
import CustomTextArea from './CustomTextArea';

const useStyles = makeStyles(theme => ({
  root: {
     
  }
}));

const InputPart = (props: InputPartProps) => {
  const {
    value,
    onChange,
    onSendMessage
  } = props;
  const classes = useStyles();

  return (
    <Box display={'flex'} paddingTop={1}>
      <Box
        position={'relative'}
        width={'100%'}
      >
        <CustomTextArea
          {...props}
        />
        {/* <TextField
          autoFocus={true}
          variant={'outlined'}
          fullWidth={true}
          value={value}
          onChange={onChange} /> */}
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