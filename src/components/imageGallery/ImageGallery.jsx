import { Component } from 'react';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import ErrorGaleryImages from 'components/errorGaleryImages/ErrorGaleryImages';
import Loader from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import Modal from 'components/modal/Modal';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    modalImgUrl: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const API_KEY = '34901760-7d58d5b4fa3fae593317e5336';
    const BASE_URL = 'https://pixabay.com/api/';

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      fetch(
        `${BASE_URL}?q=${nextName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`No picture or photo with title ${nextName}`)
          );
        })
        .then(images =>
          this.setState({
            images: images.hits,
            page: prevState.page + 1,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleClickLoadMore = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=34901760-7d58d5b4fa3fae593317e5336&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(
          new Error(`No picture or photo with title ${this.props.imageName}`)
        );
      })
      .then(images =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
            page: prevState.page + 1,
            status: 'resolved',
          };
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handleOpenModal = e => {
    this.setState({
      showModal: true,
      modalImgUrl: e.target.id,
      modalAlt: e.target.alt,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      modalImgUrl: '',
      modalAlt: '',
    });
  };

  render() {
    const { error, images, status, showModal } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorGaleryImages message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.image_gallery}>
            {images &&
              images.map(({ webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                  key={webformatURL}
                  smallImgUrl={webformatURL}
                  tag={tags}
                  bigImgUrl={largeImageURL}
                  onClick={this.handleOpenModal}
                />
              ))}
          </ul>
          <Button onClick={this.handleClickLoadMore} />

          {showModal && (
            <Modal onClose={this.handleCloseModal}>
              <img src={this.state.modalImgUrl} alt={this.state.modalAlt} />
            </Modal>
          )}
        </>
      );
    }
  }
}
