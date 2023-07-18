// Filter.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/store';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <label>
      Filter contacts by name:
      <input type="text" value={filter} onChange={handleChange} />
    </label>
  );
};

export default Filter;
