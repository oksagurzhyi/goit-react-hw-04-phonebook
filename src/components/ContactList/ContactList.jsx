import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { Contact } from 'components/Contact/Contact';

export const ContactList = ({ contacts, visibleContacts, onDelete }) => {
  const totalNumberOfContacts = contacts.length;

  return totalNumberOfContacts > 0 ? (
    <ul className={css.contactItems}>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <Contact name={name} number={number} onDelete={() => onDelete(id)} />
        </li>
      ))}
    </ul>
  ) : (
    <p>There is no such contact in your phonebook!</p>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};
