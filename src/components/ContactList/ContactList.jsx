import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/store';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = async id => {
    try {
      await dispatch(deleteContact(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <li key={contact.phone || contact.id}>
            {contact.name}: {contact.phone}
            <button type="button" onClick={() => handleDelete(contact.id)}>
              Delete
            </button>
          </li>
        ))
      ) : (
        <li>No contacts found.</li>
      )}
    </ul>
  );
};

export default ContactList;
