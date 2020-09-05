import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { SearchPartContainerProps, SearchPartContainerDispatchesFromCtx, SearchPartContainerStatesFromCtx } from './types';
import SearchPart from 'BulletNote/components/SearchPart/SearchPart';
import useChangeInput from 'lib/customHooks/useChangeInput';
import { MapDispatchToProps, MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { setFilterTags, setSearchingText } from 'BulletNote/actions/config-actions';
import { searchingTag, KEY_CODES, KEYS } from 'BulletNote/config';
import { connectCtx } from 'react-function-helpers';
import { ContextStore, BulletNoteState } from 'BulletNote/constants/context';
import useTriggerCallbackByKeyCodes from 'lib/customHooks/useTriggerCallbackByKeyCodes';

const SearchPartContainer = (props: SearchPartContainerProps) => {
  const {
    searchText,
    setSearchingTextToCtx,
    setSearchingTagToCtx,
  } = props;

  const {
    value,
    handleChange,
    setVal,
  } = useChangeInput({
    initValue: searchText
  });

  const handleSearch = useCallback(() => {
    if(!value) {
      return;
    }
    // setSearchingTagToCtx();
    setTimeout(() => {
      setSearchingTextToCtx(value);
    }, 500);
  }, [setSearchingTextToCtx, value]);

  const handleClearSearch = useCallback(() => {
    const newVal = '';
    setVal(newVal);
    setSearchingTextToCtx(newVal);
  }, [setSearchingTextToCtx, setVal]);

  useTriggerCallbackByKeyCodes({
    callback: handleSearch,
    keys:  [
      [KEYS.ENTER]
    ],
    isAutoDetectKeyCode: true,
  });

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

const mapDispatchToProps: MapDispatchToProps<OwnProps, SearchPartContainerDispatchesFromCtx> = (dispatch) => {
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

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, SearchPartContainerStatesFromCtx> = (state) => {
  return ({
    searchText: state.bulletNoteConfig.searchingText,
  });
};

const SearchPartContainerWithCtx = connectCtx(ContextStore)(mapStateToProps, mapDispatchToProps)(SearchPartContainer);

export default SearchPartContainerWithCtx;