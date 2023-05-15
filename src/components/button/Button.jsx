import css from './Button.module.css';

export const Button = ({ onClick }) => (
  <button className={css.button} onClick={onClick} type="button">
    Load more
  </button>
);