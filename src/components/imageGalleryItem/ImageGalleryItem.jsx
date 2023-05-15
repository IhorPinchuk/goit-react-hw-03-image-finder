import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ smallImgUrl, tags }) {
  return (
    <li className={css.image_gallery_item}>
      <img
        className={css.image_gallery_item_image}
        src={smallImgUrl}
        alt={tags}
      />
    </li>
  );
}
