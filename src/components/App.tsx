import React, { Component } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppState, Contact } from 'types/App';
import { TOAST_OPTIONS } from 'utils/toastOptions';

const LOCAL_KEY_CONTACTS = 'contacts';

export class App extends Component<{}, AppState> {
  state: AppState = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem(LOCAL_KEY_CONTACTS);
    if (!localData) return;
    try {
      const parsed = JSON.parse(localData) as Contact[];
      this.setState({ contacts: parsed });
    } catch (error) {
      console.error('Error parsing contacts:', error);
    }
  }

  updateLocalStorage = () => {
    localStorage.setItem(
      LOCAL_KEY_CONTACTS,
      JSON.stringify(this.state.contacts)
    );
  };

  handlerResultChange = (data: Contact) => {
    console.log(data);

    const { name, number, id } = data;
    const validInput = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        contact.number.trim() === number.trim()
    );

    const newNumber = number.replace(/(\d{3})(?=\d)/g, '$1-');

    const newContact: Contact = { id, name: name, number: newNumber };

    if (validInput) {
      toast.warn(`${name}: is already in contacts`, TOAST_OPTIONS);
      return;
    }

    this.setState(
      prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }),
      () => {
        this.updateLocalStorage();
        toast.success(`${name}: added to contacts`, TOAST_OPTIONS);
      }
    );
  };

  handlerInputData = (data: Contact) => {
    this.handlerResultChange(data);
  };

  handlerFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filter: e.currentTarget.value.toLowerCase().trim() });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  removeContact = (id: Contact['id']) => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        this.updateLocalStorage();
        toast.info('Delete contact success', TOAST_OPTIONS);
      }
    );
  };

  render() {
    const { filter } = this.state;
    const createContactList = this.visibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handlerInputData} />
        </Section>
        <Section title="Contacts">
          <Filter
            title="Find contacts by name"
            value={filter}
            onChange={this.handlerFilterChange}
          />
          <ToastContainer />
          <ContactList
            createList={createContactList}
            onDelete={this.removeContact}
          />
        </Section>
      </>
    );
  }
}
