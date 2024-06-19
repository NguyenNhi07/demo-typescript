import axios from 'axios';

export const customAxios = axios.create({
  baseURL: 'https://9f6e-118-70-190-141.ngrok-free.app/',
  headers: {
    'ngrok-skip-browser-warning': '69420',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
