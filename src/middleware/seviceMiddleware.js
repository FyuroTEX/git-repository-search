import Github from '../services/Github';
import { get, find } from 'lodash';
import { NEW_SEARCH_REQUEST, CHANGE_PAGE } from '../redux/types/types';
import {
  getData,
  getTotalSearchCount,
  resetPage,
  fromCache,
} from '../redux/actions/search';
import { isLoading, hasError } from '../redux/actions/loading';

const service = new Github();

const seviceMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const cached = get(getState(), ['search', 'cache']);
  const currentPage = get(getState(), ['search', 'page']);
  const SERVER_REST = 60000;

  if (action.type === NEW_SEARCH_REQUEST || action.type === CHANGE_PAGE) {
    dispatch(isLoading(true));

    const middleware = (params) => {
      const pages = (count) => {
        const perPage = count / 30;
        dispatch(getTotalSearchCount(perPage > 33 ? 33 : Math.ceil(perPage)));
      };

      service
        .get(...params)
        .then((result) => {
          if (result.status === 200) {
            return result.json();
          } else {
            dispatch(hasError(true));
            setTimeout(() => dispatch(hasError(false)), SERVER_REST);
            return [];
          }
        })
        .then((data) => {
          if (action.type === NEW_SEARCH_REQUEST) {
            pages(data.total_count);
            dispatch(resetPage());
          }

          dispatch(getData(action.payload, data.items));
        })
        .finally(() => dispatch(isLoading(false)));
    };

    const inCache = (pge, sRequest) => {
      return find(cached, {
        page: pge,
        searchRequest: sRequest,
      });
    };

    if (action.type === NEW_SEARCH_REQUEST) {
      const cachedData = inCache(currentPage, action.payload);
      console.log(cachedData);
      if (cachedData) {
        dispatch(fromCache(cachedData.data));
        dispatch(isLoading(false));
      } else {
        middleware([action.payload]);
      };
    };

    if (action.type === CHANGE_PAGE) {
      const url = get(getState(), ['search', 'searchRequest']);
      const cachedData = inCache(action.payload, url);

      if (cachedData) {
        dispatch(fromCache(cachedData.data));
        dispatch(isLoading(false));
      } else {
        middleware([url, action.payload]);
      };
    };
  };

  return next(action);
};

export default seviceMiddleware;
