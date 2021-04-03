import { LOADING, HAS_ERROR } from '../types/types';

const initialState = {
  loading: false,
  error: false,
};

export const utils = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case HAS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default utils;
