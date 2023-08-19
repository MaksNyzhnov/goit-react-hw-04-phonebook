import React from 'react';
import { nanoid } from 'nanoid';

import css from './Form.module.css';

const inputNameId = nanoid(5);
const inputPhoneId = nanoid(5);
class Form extends React.Component {
  state = {
    currentContact: { name: '', id: '', number: '' },
    name: '',
    number: '',
  };

  nameInputPattern =
    "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
  phoneInputPattern =
    '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}';

  onFormSubmit = event => {
    event.preventDefault();
    const { currentContact } = this.state;

    currentContact.id = nanoid(5);

    this.props.addContact(currentContact);

    this.formReset();
  };

  formReset = () => {
    this.setState({ name: '', number: '' });
  };

  onInputChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
      currentContact: { ...this.state.currentContact, [name]: value },
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.onFormSubmit}>
        <label htmlFor={inputNameId}>Name</label>
        <input
          id={inputNameId}
          className={css.form__input}
          type="text"
          name="name"
          value={name}
          pattern={this.inputNamePattern}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter name here"
          required
          onChange={this.onInputChange}
        />
        <label htmlFor={inputPhoneId}>Number</label>
        <input
          id={inputPhoneId}
          className={css.form__input}
          type="tel"
          name="number"
          value={number}
          pattern={this.phoneInputPattern}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter phone number"
          required
          onChange={this.onInputChange}
        />
        <button type="submit" className={css.form__button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
