import css from './Filter.module.css';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <>
      <p>Find contact by name</p>
      <input
        className={css.section__input}
        type="text"
        placeholder="Enter name here"
        value={filter}
        onChange={onFilterChange}
      ></input>
    </>
  );
};

export default Filter;
