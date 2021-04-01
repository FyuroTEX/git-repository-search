import { CACHE, NEW_SEARCH_REQUEST, GET_DATA } from '../types/types';

const initialState = {
  searchRequest: '',
  page: 1,
  cache: { search: '', page: 1, data: [] },
  list: {
    data: [],
    isEnd: false,
    count: 1,
  },
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case CACHE:
      return {
        ...state,
        list: state.cache[action.payload.search],
      };
    case NEW_SEARCH_REQUEST:
      return {
        ...state,
        searchRequest: action.payload,
      };
    case GET_DATA:
      return {
        ...state,
        cache: { search: action.payload.search, data: action.payload.data },
        // data: action.payload.data,
        list:{...state.list, data: action.payload.data},
      };
    default:
      return state;
  }
};

export default search;
