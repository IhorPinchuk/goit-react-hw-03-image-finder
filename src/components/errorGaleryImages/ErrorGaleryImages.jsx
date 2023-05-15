import errorImage from './oops.jpg';
import css from './ErrorGaleryImages.module.css';

export default function ErrorGaleryImages({ message }) {
  return (
    <div role="alert">
      <img
        className={css.error_image}
        src={errorImage}
        width={300}
        alt="error"
      />
      <p className={css.error_message}>{message}</p>
    </div>
  );
}
