import React from 'react';
import { Box } from '@material-ui/core';
import SettingToggle from './SettingToggle';
import { ShowOverDueMessagesToggleProps } from './types';

const ShowOverDueMessagesToggle = (props: ShowOverDueMessagesToggleProps) => {
  return (
    <SettingToggle
      {...props}
      label={'顯示已逾期限時訊息'}
    />
  );
};

export default ShowOverDueMessagesToggle;