import css from './ContactList.module.css';

import Contact from 'components/Contact/Contact';

const ContactList = ({ deleteContact, contacts }) => {
  return (
    <ul className={css.contacts__list}>
      {contacts.map(({ id, number, name }) => {
        return (
          <Contact
            key={id}
            id={id}
            name={name}
            number={number}
            deleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
