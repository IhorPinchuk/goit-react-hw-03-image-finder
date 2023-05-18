




export const fetchImages = async (inputValue, page) => {
    const API_KEY = '34901760-7d58d5b4fa3fae593317e5336';
    const BASE_URL = 'https://pixabay.com/api/';

    return await fetch(
        `${BASE_URL}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(
                new Error(`No picture or photo with title ${inputValue}`)
            );
        })
}