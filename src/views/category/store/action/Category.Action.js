import axios from "axios";
import {base_url} from "../../../../constants"
import * as contants from "../../../../constants";
export const GET_CATEGORY = "GET_CATEGORY";
export const SAVE_CATEGORY = "SAVE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const HANDLE_CHANGE_CATEGORY = "HANDLE_CHANGE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const OPEN_NEW_CATEGORY_DIALOG = "OPEN_NEW_CATEGORY_DIALOG";
export const CLOSE_NEW_CATEGORY_DIALOG = "CLOSE_NEW_CATEGORY_DIALOG";
export const OPEN_EDIT_CATEGORY_DIALOG = "OPEN_EDIT_CATEGORY_DIALOG";
export const CLOSE_EDIT_CATEGORY_DIALOG = "CLOSE_EDIT_CATEGORY_DIALOG";
export const SET_STATUS_ACTION = "SET_STATUS_ACTION";

export function getCategoryById(categoryId) {
  const request = axios.get(
    `${base_url}/app/categories/${categoryId}`
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_CATEGORY,
        data: response.data
      })
    );
}

export function addCategory(category) {
  return (dispatch, getState) => {
    const request = axios.post(
      `${base_url}/app/categories`,
      category
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: ADD_CATEGORY
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

export function updateCategory(category) {
  return (dispatch, getState) => {
    const request = axios.put(
      `${base_url}/app/categories/${category.id}`,
      category
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: UPDATE_CATEGORY
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

export function deleteCategory(categoryId) {
  return (dispatch, getState) => {
    const request = axios.delete(
      `${base_url}/app/categories/${categoryId}`
    );
    return request.then(response =>
      Promise.all([
        dispatch({
          type: DELETE_CATEGORY
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

export function openNewCategoryDialog() {
  return {
    type: OPEN_NEW_CATEGORY_DIALOG
  };
}

export function closeNewCategoryDialog() {
  return {
    type: CLOSE_NEW_CATEGORY_DIALOG
  };
}

export function openEditCategoryDialog(data) {
  return {
    type: OPEN_EDIT_CATEGORY_DIALOG,
    data
  };
}

export function closeEditCategoryDialog() {
  return {
    type: CLOSE_EDIT_CATEGORY_DIALOG
  };
}
