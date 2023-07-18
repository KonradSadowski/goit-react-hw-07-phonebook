// store.js

import { configureStore, createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('contacts', JSON.stringify(state));
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
    loadContactsFromLocalStorage: (state, action) => {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        return JSON.parse(storedContacts);
      }
      return state;
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { addContact, deleteContact, loadContactsFromLocalStorage } =
  contactsSlice.actions;
export const { setFilter } = filterSlice.actions;

const reducer = {
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
};

const store = configureStore({
  reducer,
});

export default store;
