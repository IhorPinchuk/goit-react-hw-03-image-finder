import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    imageName: ' ',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery imageName={this.state.imageName} />

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    );
  }
}
