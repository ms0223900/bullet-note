import React from 'react';
import { Box, makeStyles, TextField, Button } from '@material-ui/core';
import { SearchOutlined, ClearOutlined } from '@material-ui/icons';
import { SearchPartProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  clearBTN: {
    minWidth: 32,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 32,
  },
  searchBTN: {
    minWidth: 32,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
}));

const SearchPart = (props: SearchPartProps) => {
  const {
    inputProps,
    onSearch,
    onClear,
  } = props;
  
  const classes = useStyles();

  return (
    <Box
      display={'flex'}
      width={'100%'}
    >
      <Box
        position={'relative'}
      >
        <TextField
          {...inputProps}
          variant={'outlined'}
          fullWidth={true}
        />
        <Button
          className={classes.clearBTN}
          onClick={onClear}
        >
          <ClearOutlined />
        </Button>
        <Button
          className={classes.searchBTN}
          onClick={onSearch}
        >
          <SearchOutlined />
        </Button>
      </Box>
    </Box>
  );
};

export default SearchPart;