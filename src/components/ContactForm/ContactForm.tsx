import { FaUserPlus } from 'react-icons/fa';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactFormProps, ContactFormState } from 'types/ContactForm';

const UserIcon = FaUserPlus as React.ComponentType;

class ContactForm extends Component<ContactFormProps, ContactFormState> {
  state = {
    name: '',
    number: '',
    id: '',
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    const key = name as keyof Omit<ContactFormState, 'id'>;
    this.setState({
      [key]: name === 'number' ? value.replace(/\D/g, '') : value,
    } as Pick<ContactFormState, typeof key>);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newContact = { ...this.state, id: nanoid() };
    this.props.onSubmit(newContact);
    this.reset();
  };
  render() {
    return (
      <form className="form__box" onSubmit={this.handleSubmit}>
        <label className="form__box-label">
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handlerInputChange}
            placeholder="Name contact"
            required
          />
        </label>
        <label className="form__box-label">
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handlerInputChange}
            placeholder="Phone number"
            required
          />
        </label>
        <button className="form__box-button" type="submit">
          Add User
          <UserIcon />
        </button>
      </form>
    );
  }
}

export default ContactForm;
