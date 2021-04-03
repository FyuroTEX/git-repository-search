import {
  CACHE,
  NEW_SEARCH_REQUEST,
  GET_DATA,
  CHANGE_PAGE,
  GET_TOTAL_SEARCH_COUNT,
  RESET_PAGE
} from '../types/types';

const initialState = {
  searchRequest: '',
  page: 1,
  cache: [],
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
        list: { ...state.list, data: action.payload },
      };
    case NEW_SEARCH_REQUEST:
      return {
        ...state,
        searchRequest: action.payload,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
      
    case RESET_PAGE:
      return {
        ...state,
        page: 1,
      };
    
    case GET_DATA:
      if (state.cache.length >= 5) state.cache.shift();
      return {
        ...state,
        cache: [
          ...state.cache,
          {
            searchRequest: state.searchRequest,
            page: state.page,
            data: action.payload.data ,
          },
        ],
        list: { ...state.list, data: action.payload.data || []},
      };
    case GET_TOTAL_SEARCH_COUNT:
      return {
        ...state,
        list: { ...state.list, count: action.payload },
      };
    default:
      return state;
  }
};

export default search;
