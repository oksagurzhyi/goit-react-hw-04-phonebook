import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const LS_KEY = 'phonebookContacts';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const lsContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(lsContacts);
    return (
      parsedContacts || [
        { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
        { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
        { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
        { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isContactInPhonebook = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isContactInPhonebook) {
      return alert('This contact is already exist in your phonebook');
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const onDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizeName = filter.toLowerCase();
  console.log(contacts);
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeName)
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        fontSize: 30,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>

      <ContactForm addContact={addContact} />
      <h2> Contacts:</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={contacts}
        visibleContacts={visibleContacts}
        onDelete={onDelete}
      />
    </div>
  );
}
