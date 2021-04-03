import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { getSearchResult } from '../redux/actions/search';

import { Input } from 'semantic-ui-react';

const SearchInput = () => {
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.utils.loading);
  const isError = useSelector((state) => state.utils.error);

  function request() {
    const searchQuery = inputEl.current.inputRef.current.value.trim();
    if (searchQuery.length > 0) dispatch(getSearchResult(searchQuery));
  }

  return (
    <Input
      ref={inputEl}
      loading={isLoading}
      disabled={isError}
      onChange={debounce(request, 500)}
      placeholder='Search...'
    />
  );
};

export default SearchInput;
