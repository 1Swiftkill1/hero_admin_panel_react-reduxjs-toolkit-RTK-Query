import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/heroesFiltersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action);
}


const store = configureStore({
    reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware)
})

export default store;