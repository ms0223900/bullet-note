import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import DueDateItem from 'BulletNote/components/CommonComponents/DueDateItem';
import { DueDateItemContainerProps } from './types';
import DueDateHandler from 'BulletNote/functions/Handlers/DueDateHandler';

const defaultUpdateInterval = 1000; //1 second


const useDueDateTimer = (dueDate: Date, options?: {
  updateInterval?: number,
}) => {
  const updateInterval = options && options.updateInterval ? options.updateInterval : defaultUpdateInterval;

  const initDueDateRemainStr = DueDateHandler.getDueDateRemainTimeStr(dueDate);
  const [remainTimesStr, setStr] = React.useState(initDueDateRemainStr);

  const handleSetRemainStr = useCallback(() => {
    const remainStr = DueDateHandler.getDueDateRemainTimeStr(dueDate);
    setStr(remainStr);
  }, [dueDate]);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      handleSetRemainStr();
    }, updateInterval);
    return () => clearInterval(timer);
  }, [handleSetRemainStr, updateInterval]);

  React.useEffect(() => {
    handleSetRemainStr();
  }, [dueDate, handleSetRemainStr]);

  return ({
    remainTimesStr,
  });
};

const DueDateItemContainer = (props: DueDateItemContainerProps) => {
  const {
    remainTimesStr
  } = useDueDateTimer(props.date, {
    updateInterval: defaultUpdateInterval * 60,
  });
  
  return (
    <DueDateItem 
      {...props}
      dueDateStr={remainTimesStr}
    />
  );
};

export default DueDateItemContainer;