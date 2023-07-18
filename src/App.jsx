// App.jsx

import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import store, { loadContactsFromLocalStorage } from './redux/store';
import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(loadContactsFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Provider store={store}>
      <div className={css.App}>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
