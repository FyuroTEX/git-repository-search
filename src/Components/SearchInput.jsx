import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import {getSearchResult} from '../redux/actions/search'

import { Input } from 'semantic-ui-react';

const SearchInput = () => {
  const inputEl = useRef(null);
  const dispatch = useDispatch();

  function logerd() {
    const searchQuery = inputEl.current.inputRef.current.value.trim();
    if(searchQuery.length >0) dispatch(getSearchResult(searchQuery));
  }

  return (
    <Input
      ref={inputEl}
      onChange={debounce(logerd, 500)}
      placeholder='Search...'
    />
  );
};

export default SearchInput;
