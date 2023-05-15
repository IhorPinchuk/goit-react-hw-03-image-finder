import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: ' ',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  }
  
  render() {
    return (
      <div
        style={{
          height: '100%',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit } />

        <ImageGallery imageName={this.state.imageName} />
        
        <ToastContainer position="bottom-center" autoClose={3000} theme="colored"/>
      </div>
    );
  }
}
