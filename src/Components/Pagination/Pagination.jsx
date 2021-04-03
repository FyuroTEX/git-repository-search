import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../redux/actions/search';

import { Pagination } from 'semantic-ui-react';

const PaginationExamplePagination = () => {
  const dispatch = useDispatch();
  const maxPages = useSelector((state) => state.search.list.count);
  const currentPage = useSelector((state) => state.search.page);
  const loading = useSelector((state) => state.utils.loading);

  const handlePaginationChange = (e, { activePage }) => {
    dispatch(changePage(activePage));
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

export default PaginationExamplePagination;
