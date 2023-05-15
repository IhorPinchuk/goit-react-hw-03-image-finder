import { Component } from 'react';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import ErrorGaleryImages from 'components/errorGaleryImages/ErrorGaleryImages';
import Loader from 'components/loader/Loader';

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
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
        .then(images => this.setState({ images: images.hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { error, images, status } = this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
        return <ErrorGaleryImages message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <ul className={css.image_gallery}>
          {images &&
            images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImgUrl={webformatURL}
                tag={tags}
              />
            ))}
        </ul>
      );
    }

    // return (
    //     <>
    //         {error && <p>{error.message}</p>}
    //         <ul className={css.image_gallery}>
    //     {images && images.map(({ id, webformatURL, tags }) => (
    //     <ImageGalleryItem key={id} smallImgUrl={webformatURL} tag={tags} />
    //   ))}
    //   </ul>
    //     </>
    // );
  }
}
