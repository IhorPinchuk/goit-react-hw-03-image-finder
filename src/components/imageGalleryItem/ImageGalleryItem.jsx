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
