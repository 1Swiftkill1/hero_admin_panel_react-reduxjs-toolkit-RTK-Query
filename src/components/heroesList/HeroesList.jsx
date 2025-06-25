import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';



const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        return activeFilter === 'all'
            ? heroes
            : heroes.filter(hero => hero.element === activeFilter);
    }, [heroes, activeFilter]);


    const onDelete = useCallback((id) => {
        deleteHero(id)
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => (
            <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        ));
    };

    return <ul>{renderHeroesList(filteredHeroes)}</ul>;
};

export default HeroesList;