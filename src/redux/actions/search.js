import { NEW_SEARCH_REQUEST, GET_DATA } from '../types/types';

export function getSearchResult(query) {
    return {
        type: NEW_SEARCH_REQUEST,
        payload: query
    };
};
export function getData(search, data) {
    return {
        type: GET_DATA,
        payload: {search, data}
    };
};