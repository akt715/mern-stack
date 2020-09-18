import { SET_ALERT } from "./types";
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    const action = {
        type: SET_ALERT,
        text: {msg, alertType, id}
      }
    dispatch(action);
}
