import axios from 'axios';

// console.log(process.env.REACT_APP_BASE_URL);
const request = axios.create({
    baseURL: process.env.REACT_APP_TEST_API,
});

export default request;
