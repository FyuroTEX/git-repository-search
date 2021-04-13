import {
  REQUEST,
  SET_DATA,
  GET_FROM_CACHE
} from '../types/types';

export function newRequest({searchRequest, page}) {
  return {
    type: REQUEST,
    payload: { searchRequest, page },
  };
}

export function setData(maxPages, data, searchQuery) {
  return {
    type: SET_DATA,
    payload: { maxPages, data, searchQuery },
  };
}

export function getFromCache(cachedData) {
  return {
    type: GET_FROM_CACHE,
    payload: cachedData,
  };
}

