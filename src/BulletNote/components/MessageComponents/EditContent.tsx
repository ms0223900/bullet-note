import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { EditContentProps } from './types';
import CustomTextArea from '../InputPart/CustomTextArea';
import MessageContentHandler from 'BulletNote/functions/Handlers/MessageContentHandler';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  contentPart: {
    fontSize: '1em',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
  }
}));

const EditContent = (props: EditContentProps) => {
  const {
    isEditing,
    setEditFn,
    content,
  } = props;
  const classes = useStyles();

  if(isEditing) {
    return (
      <CustomTextArea 
        {...props}
      />
    );
  }

  return (
    <Box 
      className={classes.contentPart}
      onDoubleClick={() => setEditFn(true)}
      // onBlur={onConfirmEdit}
    >
      {MessageContentHandler.renderParsedContent(content)}
    </Box>
  );
};

export default EditContent;