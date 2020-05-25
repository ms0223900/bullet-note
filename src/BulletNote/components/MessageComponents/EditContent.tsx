import React from 'react';
import { Box, makeStyles, Divider, Hidden } from '@material-ui/core';
import { EditContentProps } from './types';
import CustomTextArea from '../InputPart/CustomTextArea';
import MessageContentHandler from 'BulletNote/functions/Handlers/MessageContentHandler';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  contentPart: {
    width: '85%',
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
      paddingBottom={0.5}
      // onBlur={onConfirmEdit}
    >
      {MessageContentHandler.renderParsedContent(content)}
    </Box>
  );
};

export default EditContent;