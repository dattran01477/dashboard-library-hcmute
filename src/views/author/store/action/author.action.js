import axios from "axios";
import {base_url} from "../../../../constants"
import * as contants from "../../../../constants";
export const GET_AUTHOR = "GET_AUTHOR";
export const DELETE_AUTHOR = "DELETE_AUTHOR";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const UPDATE_AUTHOR = "UPDATE_AUTHOR";
export const HANDLE_CHANGE_AUTHOR = "HANDLE_CHANGE_AUTHOR";
export const OPEN_NEW_AUTHOR_DIALOG = "OPEN_NEW_AUTHOR_DIALOG";
export const CLOSE_NEW_AUTHOR_DIALOG = "CLOSE_NEW_AUTHOR_DIALOG";
export const OPEN_EDIT_AUTHOR_DIALOG = "OPEN_EDIT_AUTHOR_DIALOG";
export const CLOSE_EDIT_AUTHOR_DIALOG = "CLOSE_EDIT_AUTHOR_DIALOG";
export const SET_STATUS_ACTION = "SET_STATUS_ACTION";

export function getAuthorById(authorId) {
  const request = axios.get(
    `${base_url}/app/authors/${authorId}`
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_AUTHOR,
        data: response.data
      })
    );
}

export function addAuthor(author) {
  return (dispatch, getState) => {
    const request = axios.post(
      `${base_url}/app/authors`,
       author 
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: ADD_AUTHOR
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

export function updateAuthor(author) {
  return (dispatch, getState) => {
    const request = axios.put(
      `${base_url}/app/authors/${author.id}`,
      author
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: UPDATE_AUTHOR
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

export function deleteAuthor(authorId) {
  return (dispatch, getState) => {
    const request = axios.delete(
      `${base_url}/app/authors/${authorId}`
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: DELETE_AUTHOR
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

export function openNewContactDialog() {
  return {
    type: OPEN_NEW_AUTHOR_DIALOG
  };
}

export function closeNewContactDialog() {
  return {
    type: CLOSE_NEW_AUTHOR_DIALOG
  };
}

export function openEditContactDialog(data) {
  return {
    type: OPEN_EDIT_AUTHOR_DIALOG,
    data
  };
}

export function closeEditContactDialog() {
  return {
    type: CLOSE_EDIT_AUTHOR_DIALOG
  };
}
