import Github from '../services/Github';
import { get } from 'lodash';
import { REQUEST } from '../redux/types/types';
import { setData, getFromCache } from '../redux/actions/search';
import { isLoading, hasError } from '../redux/actions/loading';

const service = new Github();

const seviceMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const lastQuery = get(getState(), ['search', 'searchRequest']);
  const SERVER_REST = 60000;

  if (action.type === REQUEST) {
    const {
      payload: { searchRequest = lastQuery, page = '' },
    } = action;
    
    dispatch(isLoading(true));

    const cachedKey = `${searchRequest}|${page}`;
    const cached = get(getState(), ['search', 'cache', cachedKey]);

    if (cached) {
      dispatch(getFromCache(cached));
      dispatch(isLoading(false));
    } else {
      const pages = (count) => {
        const perPage = count / 30;
        return perPage > 33 ? 33 : Math.ceil(perPage);
      };

      service
        .get(searchRequest, page)
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
          dispatch(setData(pages(data.total_count), data.items, cachedKey));
        })
        .finally(() => dispatch(isLoading(false)));
    }
  }

  return next(action);
};

export default seviceMiddleware;
