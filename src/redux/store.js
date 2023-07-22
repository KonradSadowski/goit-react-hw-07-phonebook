import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from '@reduxjs/toolkit';

const saveContactToServer = async contact => {
  await fetch('https://64bbb7ae7b33a35a44469a1b.mockapi.io/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
};

const fetchContactsFromServer = async () => {
  const response = await fetch(
    'https://64bbb7ae7b33a35a44469a1b.mockapi.io/contacts'
  );
  const data = await response.json();
  return data;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetchContactsFromServer();
    return response;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      await saveContactToServer(contact);
      return contact;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await fetch(
        `https://64bbb7ae7b33a35a44469a1b.mockapi.io/contacts/${contactId}`,
        {
          method: 'DELETE',
        }
      );
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);

export const setFilter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        return state.filter(contact => contact.id !== action.payload);
      });
  },
});

const reducer = {
  contacts: contactsSlice.reducer,
  filter: setFilter.reducer,
};

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
