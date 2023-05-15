import  ImgSpinner from './loader.jpg';

export default function Loader() {
    return (
        <div role='alert'>
            <img
        // className={css.error_image}
        src={ImgSpinner}
        width={300}
        alt="loading"
      />
            <p>Loading...</p>
        </div>
    )
}