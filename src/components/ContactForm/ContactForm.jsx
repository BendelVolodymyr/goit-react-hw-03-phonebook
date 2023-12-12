import React, { Component } from 'react';
import shortid from 'shortid';

// const LOCAL_KEY = 'inputValue';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    id: '',
  };

  componentDidMount() {
    // const getLocal = localStorage.getItem(LOCAL_KEY);
    // const validKey = getLocal === null;
    // if (!validKey) {
    //   const parseLocal = JSON.parse(getLocal);
    //   const { name, number } = parseLocal;
    //   this.setState({ name: name, number: number });
    // }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.name !== prevState.name || this.number !== prevState.number) {
  //     localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state));
  //   }
  // }

  reset = () => {
    this.setState({ name: '', number: '', id: '' });
  };

  handlerInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ id: shortid(), [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  render() {
    return (
      <form className="form__box" onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handlerInputChange}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handlerInputChange}
            required
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;
