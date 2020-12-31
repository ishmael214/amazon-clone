import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-37a95.cloudfunctions.net/api'
});

export default instance;

// https://us-central1-clone-37a95.cloudfunctions.net/api

// local host: http://localhost:5001/clone-37a95/us-central1/api