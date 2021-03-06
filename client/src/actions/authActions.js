 import { SET_USER, GET_ERRORS } from './types';
 import axios from 'axios';

 export const registerUser = (userData) => dispatch => {
   //calling the api
    axios
       .post('/api/users/register', userData)
       .then(res => console.log(res.data))
       .catch(err => dispatch ({
          type: GET_ERRORS,
          payload: err.response.data
        })); 
 }