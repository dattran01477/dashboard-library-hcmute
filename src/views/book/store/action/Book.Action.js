import axios from "axios";
import { base_url } from "../../../../constants";
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
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_AUTHORS = "GET_AUTHORS";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_PUBLISHER = "GET_PUBLISHER";
export const STATUS = ["Publish", "Private", "Waiting", "Cancel"];

export function setStatusAction(status) {
  return {
    type: SET_STATUS_ACTION,
    statusAction: status
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

export function getAuthors(onSuccessGetAuthors) {
  const request = axios.get(`${base_url}/app/authors`);

  request.then(response => onSuccessGetAuthors(response.data));
}

export function getCategories(onSuccessGetCategories) {
  const request = axios.get(`${base_url}/app/categories`);

  request.then(response => onSuccessGetCategories(response.data));
}

export function getLanguages(onSuccessGetLanguages) {
  const request = axios.get(`${base_url}/app/languages`);

  request.then(response => onSuccessGetLanguages(response.data));
}

export function getPublisher(onSuccessGetPublisher) {
  const request = axios.get(`${base_url}/app/publishers`);

  request.then(response => onSuccessGetPublisher(response.data));
}

export function saveBook(book, callBackSuccess, callBackFail) {
  const request = axios.post(`${base_url}/app/books`, book);

  request
    .then(response => callBackSuccess(response.data))
    .catch(err => callBackFail(err));
}

export function getBooks(criteria, callBackSuccess, callBackFail) {
  const request = axios.get(`${base_url}/app/books`, criteria);
  request
    .then(response => callBackSuccess(response.data))
    .catch(err => callBackFail(err));
}


export function getBook(bookId, callBackSuccess, callBackFail) {
  const request = axios.get(`${base_url}/app/books/${bookId}`);
  request
    .then(response => callBackSuccess(response.data))
    .catch(err => callBackFail(err));
}
