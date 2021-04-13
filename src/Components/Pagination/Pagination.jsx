import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newRequest } from '../../redux/actions/search';

import { Pagination } from 'semantic-ui-react';

const PaginationPage = () => {
  const dispatch = useDispatch();
  const maxPages = useSelector((state) => state.search.maxPages);
  const currentPage = useSelector((state) => state.search.currentPage);
  const loading = useSelector((state) => state.utils.loading);

  const handlePaginationChange = (e, { activePage }) => {
    dispatch(newRequest({page: activePage}));
  };
  return (
    <Pagination
      activePage={currentPage}
      onPageChange={handlePaginationChange}
      totalPages={maxPages}
      disabled={loading}
    />
  );
};

export default PaginationPage;
