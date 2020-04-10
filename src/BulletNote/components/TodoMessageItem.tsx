import React from 'react';
import { Checkbox } from '@material-ui/core';
import { ToDoMessageItemProps } from './types';
import MessageItemWrapperContainerWithCtx from '../containers/wrappers/MessageItemWrapperContainer';

const TodoMessageItem = (props: ToDoMessageItemProps) => {
  return (
    <MessageItemWrapperContainerWithCtx
      {...props}>
      <Checkbox
        color={'primary'}
        onChange={props.onToggleTodo}
        checked={!!props.status.isDone} />
    </MessageItemWrapperContainerWithCtx>
  );
};

export default TodoMessageItem;