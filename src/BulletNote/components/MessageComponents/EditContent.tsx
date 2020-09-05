import React, { memo, useMemo } from 'react';
import { Box, makeStyles, Divider, Hidden, Button } from '@material-ui/core';
import { EditContentProps } from './types';
import CustomTextArea from '../InputPart/CustomTextArea';
import MessageContentHandler from 'BulletNote/functions/Handlers/MessageContentHandler';
import { ConfirmationNumberOutlined, CheckOutlined } from '@material-ui/icons';
import useToggle from 'lib/customHooks/useToggle';

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
    // '&:hover': {
    //   WebkitLineClamp: 1000,
    // }
  }
}));

const EditContent = (props: EditContentProps) => {
  const {
    isEditing,
    content,
    searchText,
    setEditFn,
    handleConfirmEdit,
  } = props;

  const classes = useStyles();
  const {
    toggle: isExpanded,
    handleToggle,
  } = useToggle(false);

  const parsedContent = useMemo(() => {
    if(!isEditing) {
      return (
        MessageContentHandler.renderParsedContent(content, {
          searchText: searchText,
        })
      );
    }
    return '';
  }, [content, isEditing, searchText]);

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
      paddingBottom={0.5}
      className={classes.contentPart}
      style={{
        WebkitLineClamp: isExpanded ? 1000 : 3,
      }}
      onClick={handleToggle}
      onDoubleClickCapture={() => setEditFn(true)}
      onDoubleClick={() => setEditFn(true)}
      // onBlur={onConfirmEdit}
    >
      {parsedContent}
    </Box>
  );
};

export default memo(EditContent);