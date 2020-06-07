import React from 'react';
import { TagWholePageDateTagToggleProps } from './types';
import SettingToggle from './SettingToggle';

const TagWholePageDateTagToggle = (props: TagWholePageDateTagToggleProps) => {
  return (
    <SettingToggle 
      {...props}
      label={'顯示日期分隔線'}
    />
  );
};

export default TagWholePageDateTagToggle;