import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  smallImgUrl,
  tag,
  onClick,
  bigImgUrl,
}) {
  return (
    <li className={css.image_gallery_item} onClick={onClick}>
      <img
        className={css.image_gallery_item_image}
        src={smallImgUrl}
        alt={tag}
        id={bigImgUrl}
        loading="lazy"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImgUrl: propTypes.string.isRequired,
  tag: propTypes.string.isRequired,
  onclick: propTypes.func,
  bigImgUrl: propTypes.string.isRequired,
};
