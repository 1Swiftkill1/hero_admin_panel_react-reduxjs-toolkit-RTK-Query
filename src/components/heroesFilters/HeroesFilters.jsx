import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeFilterChanged, fetchFilters, selectAll } from './heroesFiltersSlice';
import classNames from 'classnames';

const HeroesFilters = () => {
    const filters = useSelector(selectAll);
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
    }, [dispatch]);

    const onFilterSelect = (filter) => {
        dispatch(activeFilterChanged(filter));
    }

    const renderFilters = (filters) => {
        if (filters.length === 0) {
            return <h5>Фильтры не найдены</h5>
        }

        return filters.map(({ id, value, label, className }) => {
            const btnClass = classNames('btn', className, {
                'active': value === activeFilter
            });

            return (
                <button
                    key={id}
                    className={btnClass}
                    onClick={() => onFilterSelect(value)}>
                    {label}
                </button>
            )
        });
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;