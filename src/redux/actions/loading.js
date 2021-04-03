import { LOADING, HAS_ERROR } from '../types/types';


export function isLoading(state) {
    return {
        type: LOADING,
        payload: state
    };
};
export function hasError(state) {
    return {
        type: HAS_ERROR,
        payload: state
    };
};
