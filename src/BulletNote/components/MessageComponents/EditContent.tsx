import React from 'react';
import { Box, makeStyles, Divider, Hidden, Button } from '@material-ui/core';
import { EditContentProps } from './types';
import CustomTextArea from '../InputPart/CustomTextArea';
import MessageContentHandler from 'BulletNote/functions/Handlers/MessageContentHandler';
import { ConfirmationNumberOutlined, CheckOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  contentPart: {
    // minWidth: '80%',
    fontSize: '1em',
    lineHeight: 1.5,
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    '&:hover': {
      WebkitLineClamp: 1000,
    }
  }
}));

const EditContent = (props: EditContentProps) => {
  const {
    handleConfirmEdit,
    isEditing,
    setEditFn,
    content,
  } = props;
  const classes = useStyles();

  if(isEditing) {
    return (
      <Box
        position={'relative'} 
        width={'100%'}
      >
        <CustomTextArea 
          {...props}
        />
        <Button 
          color={'primary'}
          variant={'outlined'}
          onClick={handleConfirmEdit}
        >
          <CheckOutlined />
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      className={classes.contentPart}
      onDoubleClickCapture={() => setEditFn(true)}
      onDoubleClick={() => setEditFn(true)}
      paddingBottom={0.5}
      // onBlur={onConfirmEdit}
    >
      {MessageContentHandler.renderParsedContent(content, {
        searchText: props.searchText,
      })}
    </Box>
  );
};

export default EditContent;