import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';  
import { setAlert } from '../actions/alert';

//Register user
export const register = ({ name , email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'applicaitoin/json'
        }
    }

    const body  = JSON.stringify({name,email, password});

    // Simple POST request with a JSON body using fetch
   

    try {
        const res = await axios.post('http://localhost:5000/api/user/signup',body,config);

        dispatch({
            type:  REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:  REGISTER_FAIL
        })
    }
}