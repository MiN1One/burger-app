import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-starter-ced1e.firebaseio.com/'
});

export default instance;