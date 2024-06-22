import axios from 'axios';

export const customAxios = axios.create({
  baseURL: 'https://1795-14-191-163-120.ngrok-free.app/',
  headers: {
    'ngrok-skip-browser-warning': '69420',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
