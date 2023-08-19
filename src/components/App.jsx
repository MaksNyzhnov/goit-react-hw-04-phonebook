import React, { useState } from "react";

import Section from "./Section/Section";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import useLocalStorage from "./Hooks/useLocalStorage";
const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState("");

//   useEffect(() => {
// const contacts = localStorage.getItem('contacts')
//     if (contacts) {
//       console.log(contacts)
//       const parcedContacts = JSON.parse(contacts)
//       setContacts(parcedContacts)
//     }
//   }, [])

//   useEffect(() => {
   
//      localStorage.setItem('contacts', JSON.stringify(contacts))
   
//   }, [contacts])
  
  const  addContact = contact => {
    if (checkContactRepetition(contact, contacts)) {
      showAlert(contact.name)
      return
    }
    setContacts([...contacts, contact]);
  
  }

  const checkContactRepetition = (contact, presentContacts) => {
    for (let item of presentContacts) {
      if (item.name === contact.name) {
        return true;
      }
    }
    return false;
  };

const deleteContact = (id) => {
    
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
  }

const onFilterChange = (event) => {
setFilter({filter: event.currentTarget.value})
  }

const showAlert = name => {
    alert(`${name} is already in your contacts`);
  };

const getFilteredContacts = () => {
    

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

const filteredContacts = getFilteredContacts();
    return (
      
      <>
        <h1>PhoneBook</h1>
        <Section>
          <Form addContact={addContact} />
        </Section>
        <Section title="Contacts" >
          <Filter filter={filter} onFilterChange={onFilterChange} />
          { < ContactList contacts={filteredContacts} deleteContact={deleteContact}></ContactList>}
        </Section>
      </>
    )

  }



export default App
