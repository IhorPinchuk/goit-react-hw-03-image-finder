import { Component } from 'react';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.info('Enter the name of the picture or photo');
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.search_form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.search_form_button}>
            <span className={css.search_form_button_label}>Search</span>
          </button>

          <input
            className={css.search_form_input}
            type="text"
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
