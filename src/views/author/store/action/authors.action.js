import axios from "axios";
export const GET_AUTHORS = "GET_AUTHORS";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function getAuthors(criteria) {
  const request = axios.get("https://libraryhcmute.herokuapp.com/app/authors", {
    criteria
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
