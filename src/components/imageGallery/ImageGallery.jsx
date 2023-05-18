import { Component } from 'react';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import { fetchImages } from '../../services/images-api';
import css from './ImageGallery.module.css';
import ErrorGaleryImages from 'components/errorGaleryImages/ErrorGaleryImages';
import Loader from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import Modal from 'components/modal/Modal';

export default class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: null,
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    modalImgUrl: '',
    modalAlt: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ page: 1, status: 'pending' });

      await fetchImages(nextName, 1)
        .then(images =>
          this.setState({
            images: images.hits,
            status: 'resolved',
            totalHits: images.totalHits,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleClickLoadMore = async () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });

    const nextName = this.props.imageName;
    const page = this.state.page + 1;
    await fetchImages(nextName, page)
      .then(images =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
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
          {this.state.images.length < this.state.totalHits && (
            <Button onClick={this.handleClickLoadMore} />
          )}

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
