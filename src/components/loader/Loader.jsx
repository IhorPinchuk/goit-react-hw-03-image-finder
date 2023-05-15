import loading from './loader.png';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader_wrapper} role="alert">
      <img
        className={css.loader_image}
        src={loading}
        width={300}
        alt="loading"
      />
      <p className={css.loader_text}>Loading...</p>
    </div>
  );
}
