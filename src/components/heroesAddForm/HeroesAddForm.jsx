import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from '../../api/apiSlice';
import { selectAll } from '../heroesFilters/heroesFiltersSlice';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label fs-4">
        {label}
      </label>
      <input
        className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''}`}
        {...field}
        {...props}
      />
      <ErrorMessage name={props.name}>
        {(msg) => <div className="invalid-feedback">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label fs-4">
        {label}
      </label>
      <textarea
        className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''}`}
        style={{ height: '130px' }}
        {...field}
        {...props}
      />
      <ErrorMessage name={props.name}>
        {(msg) => <div className="invalid-feedback">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

const SelectInput = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <select
        className={`form-select ${meta.touched && meta.error ? 'is-invalid' : ''}`}
        {...field}
        {...props}
      >
        {children}
      </select>
      <ErrorMessage name={props.name}>
        {(msg) => <div className="invalid-feedback">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

const HeroesAddForm = () => {
  const [createHero, { isLoading }] = useCreateHeroMutation();
  const filters = useSelector(selectAll);
  const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Обязательное поле'),
    description: Yup.string()
      .min(5, 'Минимум 5 символов')
      .max(200, 'Максимум 200 символов')
      .required('Обязательное поле'),
    element: Yup.string()
      .required('Выберите элемент')
  });

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
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        element: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const newHero = {
          id: uuidv4(),
          ...values
        };

        createHero(newHero).unwrap()
          .then(() => {
            resetForm();
          })
          .catch(err => {
            console.error('Ошибка при создании героя:', err);
          });
      }}
    >
      {({ isValid }) => (
        <Form className="border p-4 shadow-lg rounded">
          <TextInput
            name="name"
            label="Имя нового героя"
            id="name"
            placeholder="Как меня зовут?"
          />
          
          <TextArea
            name="description"
            label="Описание"
            id="description"
            placeholder="Что я умею?"
          />
          
          <SelectInput
            name="element"
            label="Выбрать элемент героя"
            id="element"
          >
            <option value="">Я владею элементом...</option>
            {renderElements(filters)}
          </SelectInput>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !isValid}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Создание...
              </>
            ) : 'Создать'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default HeroesAddForm;