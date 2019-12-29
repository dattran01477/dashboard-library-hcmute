import axios from "axios";
import { base_url } from "../../../../constants";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function getCategories(criteria) {
  const request = axios.get(`${base_url}/app/categories`, {
    params: criteria
  });

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_CATEGORIES,
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
