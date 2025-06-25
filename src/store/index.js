import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice'
import filters from '../components/heroesFilters/heroesFiltersSlice';

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action);
}


const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware)
})

export default store;