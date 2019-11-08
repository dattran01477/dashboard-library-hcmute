import axios from "axios";
import {base_url} from "../../../../constants"
export const GET_LANGUAGES = "GET_LANGUAGES";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function getLanguages(criteria) {
  const request = axios.get(`${base_url}/app/languages`, {
    params: criteria
  });

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_LANGUAGES,
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
