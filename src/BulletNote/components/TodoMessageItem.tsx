import React from 'react';
import { Checkbox } from '@material-ui/core';
import { ToDoMessageItemProps } from './types';
import MessageItemWrapperContainerWithCtx from '../containers/wrappers/MessageItemWrapperContainer';

const onChangeFn = (onToggleTodo: any) =>(e: any) =>  {
  const { checked } = e.target;
  onToggleTodo && onToggleTodo(e, checked);
};

const TodoMessageItem = (props: ToDoMessageItemProps) => {
  return (
    <MessageItemWrapperContainerWithCtx
      {...props}>
      {/* <input 
        type={'checkbox'}
        onChange={onChangeFn(props.onToggleTodo)}
        checked={!!props.status.isDone}
      /> */}
      <Checkbox
        color={'primary'}
        onChange={props.onToggleTodo}
        checked={!!props.status.isDone} />
    </MessageItemWrapperContainerWithCtx>
  );
};

export default TodoMessageItem;