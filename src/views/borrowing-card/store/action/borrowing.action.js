import axios from "axios";
import { base_url } from "../../../../constants";
import * as contants from "../../../../constants";
import qs from "querystring"
export const GET_BORROWING = "GET_BORROWING";
export const DELETE_BORROWING = "DELETE_BORROWING";
export const ADD_BORROWING = "ADD_BORROWING";
export const UPDATE_BORROWING = "UPDATE_BORROWING";
export const HANDLE_CHANGE_BORROWING = "HANDLE_CHANGE_BORROWING";
export const OPEN_NEW_BORROWING_DIALOG = "OPEN_NEW_BORROWING_DIALOG";
export const CLOSE_NEW_BORROWING_DIALOG = "CLOSE_NEW_BORROWING_DIALOG";
export const OPEN_EDIT_BORROWING_DIALOG = "OPEN_EDIT_BORROWING_DIALOG";
export const CLOSE_EDIT_BORROWING_DIALOG = "CLOSE_EDIT_BORROWING_DIALOG";
export const SET_STATUS_ACTION = "SET_STATUS_ACTION";



export function getBorrowingById(borrowingCardId) {
  const request = axios.get(`${base_url}/app/borrowing-card/${borrowingCardId}`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BORROWING,
        data: response.data
      })
    );
}

export function addBorrowing(borrowingCard) {
  return (dispatch, getState) => {
    const request = axios.post(`${base_url}/app/borrowing-card`, borrowingCard);
    return request.then(response =>
      Promise.all([
        dispatch({
          type: ADD_BORROWING
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

export function updateBorrowing(borrowingCard) {
  return (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
  
    const request = axios.put(
      `${base_url}/api/borrowings/${borrowingCard._id}`,
      qs.stringify(borrowingCard),
      config
    );
  
    return request.then(response =>
      Promise.all([
        dispatch({
          type: UPDATE_BORROWING
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

export function deleteBorrowing(borrowingCardId) {
  return (dispatch, getState) => {
    const request = axios.delete(`${base_url}/app/borrowing-card/${borrowingCardId}`);
    return request.then(response =>
      Promise.all([
        dispatch({
          type: DELETE_BORROWING
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

export function openNewBorrowingDialog() {
  return {
    type: OPEN_NEW_BORROWING_DIALOG
  };
}

export function closeNewBorrowingDialog() {
  return {
    type: CLOSE_NEW_BORROWING_DIALOG
  };
}

export function openEditBorrowingDialog(data) {
  return {
    type: OPEN_EDIT_BORROWING_DIALOG,
    data
  };
}

export function closeEditBorrowingDialog() {
  return {
    type: CLOSE_EDIT_BORROWING_DIALOG
  };
}
