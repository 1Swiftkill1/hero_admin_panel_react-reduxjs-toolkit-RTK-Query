import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../heroesFilters/heroesFiltersSlice';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const [createHero, { isLoading }] = useCreateHeroMutation();

    const filters = useSelector(selectAll);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        };

        createHero(newHero).unwrap()
            .then(() => {
                setHeroName('');
                setHeroDescription('');
                setHeroElement('');
            })
            .catch(err => console.error('Ошибка при создании героя:', err));
    }

    const renderElements = (filters) => {
        if (filtersLoadingStatus === "loading") {
            return <option>Загрузка элементов...</option>;
        } else if (filtersLoadingStatus === "error") {
            return <option>Ошибка загрузки элементов</option>;
        }

        return filters
            .filter(item => item.value !== 'all')
            .map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ));
    }

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={onSubmitHandler}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option value="">Я владею элементом...</option>
                    {renderElements(filters)}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Создание...
                    </>
                ) : 'Создать'}
            </button>
        </form>
    )
}

export default HeroesAddForm;