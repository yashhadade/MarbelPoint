import axios from 'axios';

export const server = axios.create({
  baseURL: "http://localhost:8080/api/v1",  
  responseType: 'json',
  headers: {
    // You can dynamically set the Authorization header from localStorage
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
 
});
// console.log(localStorage.getItem('token'));
