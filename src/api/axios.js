import axios from 'axios';

export default axios.create({
    baseURL: 'https://java-api.codeboxxtest.xyz',
    credentials : true
});