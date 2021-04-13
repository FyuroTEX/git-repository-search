import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { newRequest } from '../../redux/actions/search';

import { Input } from 'semantic-ui-react';

const SearchInput = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.utils.loading);
  const isError = useSelector((state) => state.utils.error);

  //eslint-disable-next-line
  const delayQuery = useCallback(
    debounce(
      (val) => dispatch(newRequest({ searchRequest: val, page: 1 })),
      500
    ),
    []
  );

  const hadleChange = ({ target: { value } }) => {
    if (!value.trim().length) return;

    delayQuery(value);
  };

  return (
    <Input
      loading={isLoading}
      disabled={isError}
      onChange={hadleChange}
      placeholder='Search...'
    />
  );
};

export default SearchInput;
