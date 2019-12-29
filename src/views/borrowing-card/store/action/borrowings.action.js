import axios from "axios";
import { base_url } from "../../../../constants";
export const GET_BORROWINGS = "GET_BORROWINGS";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";
export const SET_STOMP_CLIENT = "SET_STOMP_CLIENT";

export function getBorrowings(criteria) {
  const request = axios.get(`${base_url}/borrowing-card`, criteria);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BORROWINGS,
        data: response.data
      })
    );
}

export function changeCriteria(criteria) {
  return {
    type: CHANGE_CRITERIA,
    criteria: criteria
  };
}

export function setStompClient(stomp) {
  return {
    type: SET_STOMP_CLIENT,
    stomp: stomp
  };
}
