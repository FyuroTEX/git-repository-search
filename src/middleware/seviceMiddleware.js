import Github from '../services/github';
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

  if (action.type === CHANGE_PAGE) {
    dispatch(isLoading(true));

    const url = get(getState(), ['search', 'searchRequest']);
    const inCache = find(cached, { page: action.payload, searchRequest: url });
    if (inCache) {
      dispatch(fromCache(inCache.data));
      dispatch(isLoading(false));
    } else {
      service
        .get(url, action.payload)
        .then((result) => {
          if (result.status === 200) {
            return result.json();
          } else {
            dispatch(hasError(true));
            setTimeout(() => dispatch(hasError(false)), SERVER_REST);
            return [];
          }
        })
        .then((data) => dispatch(getData(action.payload, data.items)))
        .finally(() => dispatch(isLoading(false)));
    }
  }

  if (action.type === NEW_SEARCH_REQUEST) {
    const inCache = find(cached, {
      page: currentPage,
      searchRequest: action.payload,
    });

    if (inCache) {
      dispatch(fromCache(inCache.data));
    } else {
      const pages = (count) => {
        const perPage = count / 30;
        dispatch(getTotalSearchCount(perPage > 33 ? 33 : Math.ceil(perPage)));
      };

      service
        .get(action.payload)
        .then((result) => {
          if (result.status === 200) {
            return result.json();
          } else {
            dispatch(hasError(true));
            setTimeout(() => dispatch(hasError(false)), SERVER_REST);
          }
        })
        .then((data) => {
          pages(data.total_count);
          dispatch(resetPage());
          dispatch(getData(action.payload, data.items));
        });
    }
  }
  return next(action);
};

export default seviceMiddleware;
