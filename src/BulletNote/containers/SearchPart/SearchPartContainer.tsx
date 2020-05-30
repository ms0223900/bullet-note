import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { SearchPartContainerProps } from './types';
import SearchPart from 'BulletNote/components/SearchPart/SearchPart';
import useChangeInput from 'lib/customHooks/useChangeInput';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { setFilterTags, setSearchingText } from 'BulletNote/actions/config-actions';
import { searchingTag, KEY_CODES } from 'BulletNote/config';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from 'BulletNote/constants/context';
import useTriggerCallbackByKeyCodes from 'lib/customHooks/useTriggerCallbackByKeyCodes';

const SearchPartContainer = (props: SearchPartContainerProps) => {
  const {
    setSearchingTextToCtx,
    setSearchingTagToCtx,
  } = props;

  const {
    value,
    handleChange,
    setVal,
  } = useChangeInput({
    initValue: ''
  });

  const handleSearch = useCallback(() => {
    if(!value) {
      return;
    }
    setSearchingTagToCtx();
    setTimeout(() => {
      setSearchingTextToCtx(value);
    }, 500);
  }, [setSearchingTagToCtx, setSearchingTextToCtx, value]);

  const handleClearSearch = useCallback(() => {
    const newVal = '';
    setVal(newVal);
    setSearchingTextToCtx(newVal);
  }, [setSearchingTextToCtx, setVal]);

  useTriggerCallbackByKeyCodes(handleSearch, [
    [KEY_CODES.ENTER]
  ]);

  return (
    <SearchPart 
      inputProps={{
        value,
        onChange: handleChange,
      }}
      onSearch={handleSearch}
      onClear={handleClearSearch}
    />
  );
};

interface OwnProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, SearchPartContainerProps> = (dispatch) => {
  return ({
    setSearchingTextToCtx: (text) => {
      const action = setSearchingText(text);
      dispatch(action);
    },
    setSearchingTagToCtx: () => {
      const action = setFilterTags([
        searchingTag
      ]);
      dispatch(action);
    }
  });
};

const SearchPartContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(SearchPartContainer);

export default SearchPartContainerWithCtx;