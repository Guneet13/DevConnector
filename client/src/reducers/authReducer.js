 import { SET_USER } from '../actions/types';
 
 const initialState = {
    isAuthenticated: false,
    user: {}
 }
 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state= initialState, action){
    switch(action.type){
      //dispatch call
      case SET_USER: 
        return{
          ...state,
          user: action.payload
        }
      default: 
      return state;
    }
 }