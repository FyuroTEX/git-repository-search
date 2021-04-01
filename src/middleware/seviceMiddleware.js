import Github from '../services/github';
// import { get } from 'lodash';
import { NEW_SEARCH_REQUEST } from '../redux/types/types';
import { getData } from '../redux/actions/search';

const service = new Github();

const seviceMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  // if(action.) чек на экшен из сьорча
  if (action.type === NEW_SEARCH_REQUEST) {
    console.log('dispatch', action.payload);

    // const { payload: { search, page } } = action;
    // let resultUrl = search;

    // if(page) {
    // 	  resultUrl = `${search}${page}`;
    // }

    // const cached = get(getState(), ['cache', resultUrl]);

    // if(cached) {
    // 	dispatch(/* экшен для взятия с кеша с аргументов resultUrl */)
    // }

    service
      .get(action.payload)
      .then((result) => result.json())
      .then((data) => dispatch(getData(action.payload, data.items)));
  }
  return next(action);
};

export default seviceMiddleware;
