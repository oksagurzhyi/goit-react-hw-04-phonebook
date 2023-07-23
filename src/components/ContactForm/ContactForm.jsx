import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const input = event.currentTarget;
    switch (input.name) {
      case 'name':
        setName(input.value);

        break;
      case 'number':
        setNumber(input.value);

        break;

      default:
        break;
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    addContact({
      id: nanoid(),
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formContact} onSubmit={onSubmit}>
      <label className={css.labelContact}>
        Name
        <input
          className={css.inputContact}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.labelContact}>
        Number
        <input
          className={css.inputContact}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" onSubmit={onSubmit} className={css.btnSubmit}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
