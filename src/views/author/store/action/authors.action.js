import axios from "axios";
import { base_url } from "../../../../constants";
export const GET_AUTHORS = "GET_AUTHORS";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";
export const SET_STOMP_CLIENT = "SET_STOMP_CLIENT";

export function getAuthors(criteria) {
  const request = axios.get(`${base_url}/app/authors`, {
    params: criteria
  });

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_AUTHORS,
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
