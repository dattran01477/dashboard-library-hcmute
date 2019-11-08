import axios from "axios";
import {base_url} from "../../../../constants"
import * as contants from "../../../../constants";
export const GET_LANGUAGE = "GET_LANGUAGE";
export const SAVE_LANGUAGE = "SAVE_LANGUAGE";
export const ADD_LANGUAGE = "ADD_LANGUAGE";
export const DELETE_LANGUAGE = "DELETE_LANGUAGE";
export const HANDLE_CHANGE_LANGUAGE = "HANDLE_CHANGE_LANGUAGE";
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";
export const OPEN_NEW_LANGUAGE_DIALOG = "OPEN_NEW_LANGUAGE_DIALOG";
export const CLOSE_NEW_LANGUAGE_DIALOG = "CLOSE_NEW_LANGUAGE_DIALOG";
export const OPEN_EDIT_LANGUAGE_DIALOG = "OPEN_EDIT_LANGUAGE_DIALOG";
export const CLOSE_EDIT_LANGUAGE_DIALOG = "CLOSE_EDIT_LANGUAGE_DIALOG";
export const SET_STATUS_ACTION = "SET_STATUS_ACTION";

export function getLanguageById(languageId) {
  const request = axios.get(
    `${base_url}/app/languages/${languageId}`
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_LANGUAGE,
        data: response.data
      })
    );
}

export function addLanguage(language) {
  return (dispatch, getState) => {
    const request = axios.post(
      `${base_url}/app/languages`,
      language
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: ADD_LANGUAGE
        })
      ])
        .then(() => {
          dispatch(setStatusAction(contants.STATUS_ACTION_SUCCESSED));
        })
        .catch(err => {
          dispatch(setStatusAction(contants.STATUS_ACTION_FAILED));
        })
    );
  };
}

export function setStatusAction(status) {
  return {
    type: SET_STATUS_ACTION,
    statusAction: status
  };
}

export function updateLanguage(language) {
  return (dispatch, getState) => {
    const request = axios.put(
      `${base_url}/app/languages/${language.id}`,
      language
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: UPDATE_LANGUAGE
        })
      ])
        .then(() => {
          dispatch(setStatusAction(contants.STATUS_ACTION_SUCCESSED));
        })
        .catch(err => {
          dispatch(setStatusAction(contants.STATUS_ACTION_FAILED));
        })
    );
  };
}

export function deleteLanguage(languageId) {
  return (dispatch, getState) => {
    const request = axios.delete(
      `${base_url}/app/languages/${languageId}`
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: DELETE_LANGUAGE
        })
      ])
        .then(() => {
          dispatch(setStatusAction(contants.STATUS_ACTION_SUCCESSED));
        })
        .catch(err => {
          dispatch(setStatusAction(contants.STATUS_ACTION_FAILED));
        })
    );
  };
}

export function openNewLanguageDialog() {
  return {
    type: OPEN_NEW_LANGUAGE_DIALOG
  };
}

export function closeNewLanguageDialog() {
  return {
    type: CLOSE_NEW_LANGUAGE_DIALOG
  };
}

export function openEditLanguageDialog(data) {
  return {
    type: OPEN_EDIT_LANGUAGE_DIALOG,
    data
  };
}

export function closeEditLanguageDialog() {
  return {
    type: CLOSE_EDIT_LANGUAGE_DIALOG
  };
}
