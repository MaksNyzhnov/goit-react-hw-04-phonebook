import React from "react";

import Section from "./Section/Section";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends React.Component {
  state = {
  contacts: [],
  filter:''
}
  addContact = contact => {
    if (this.checkContactRepetition(contact, this.state.contacts)) {
      this.showAlert(contact.name)
      return
    }
  this.setState(prevState => {
    return {
      contacts: [...prevState.contacts, contact]
    };
  });
  }

  checkContactRepetition = (contact, presentContacts) => {
    for (let item of presentContacts) {
      if (item.name === contact.name) {
        return true;
      }
    }
    return false;
  };

  deleteContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    this.setState({ contacts: updatedContacts });
  }

  onFilterChange = (event) => {
this.setState({filter: event.currentTarget.value})
  }

  showAlert = name => {
    alert(`${name} is already in your contacts`);
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    if (contacts) {
      this.setState({contacts: JSON.parse(contacts)})
    }
}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
   }
}


  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter} = this.state
    return (
      
    <>
        <h1>PhoneBook</h1>
        <Section>
          <Form addContact={this.addContact} />
        </Section>
        <Section title="Contacts" >
          <Filter filter={filter} onFilterChange={this.onFilterChange} />
          <ContactList contacts={filteredContacts} deleteContact={this.deleteContact}></ContactList>
        </Section>
    </>
    )
  }
}

export default App
