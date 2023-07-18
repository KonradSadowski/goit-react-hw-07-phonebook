// ContactForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/store';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ id: Date.now(), name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.Form}>
      <label className={css.labelForm}>
        Name:
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </label>
      <label className={css.labelForm}>
        Number:
        <input
          type="tel"
          value={number}
          onChange={event => setNumber(event.target.value)}
          required
        />
      </label>
      <button type="submit" className={css.formButton}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
