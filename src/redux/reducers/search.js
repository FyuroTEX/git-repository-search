import {
  REQUEST,
  GET_FROM_CACHE,
  SET_DATA,
} from '../types/types';

const initialState = {
  searchRequest: '',
  currentPage: 1,
  maxPages: 1,
  cache: {},
  list: [],
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case GET_FROM_CACHE:
      return {
        ...state,
        list: action.payload,
      };
    case REQUEST:
      return {
        ...state,
        searchRequest: action.payload.searchRequest || state.searchRequest,
        currentPage: action.payload.page || 1,
      };
    case SET_DATA:
      const cachedKeys = Object.keys(state.cache);
      if (cachedKeys.length >= 5) delete state.cache[cachedKeys[0]];
      return {
        ...state,
        maxPages: action.payload.maxPages,
        list: action.payload.data || [],
        cache: {
          ...state.cache,
          [action.payload.searchQuery]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default search;
