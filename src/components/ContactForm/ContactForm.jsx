import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/store';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addContact({
        name,
        phone,
      })
    );

    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label>
        Number
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
