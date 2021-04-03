import {
  NEW_SEARCH_REQUEST,
  GET_DATA,
  CHANGE_PAGE,
  GET_TOTAL_SEARCH_COUNT,
  CACHE,
  RESET_PAGE,
} from '../types/types';

export function getSearchResult(query) {
  return {
    type: NEW_SEARCH_REQUEST,
    payload: query,
  };
}

export function fromCache(data) {
  return {
    type: CACHE,
    payload: data,
  };
}

export function getData(search, data) {
  return {
    type: GET_DATA,
    payload: { search, data },
  };
};

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};
export function resetPage() {
  return {
    type: RESET_PAGE
  };
};

export function getTotalSearchCount(count) {
  return {
    type: GET_TOTAL_SEARCH_COUNT,
    payload: count,
  };
};
