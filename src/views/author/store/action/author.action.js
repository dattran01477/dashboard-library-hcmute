import axios from "axios";
export const GET_AUTHOR = "GET_AUTHOR";
export const DELETE_AUTHOR = "DELETE_AUTHOR";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const UPDATE_AUTHOR = "UPDATE_AUTHOR";
export const HANDLE_CHANGE_AUTHOR = "HANDLE_CHANGE_AUTHOR";
export const OPEN_NEW_AUTHOR_DIALOG = "OPEN_NEW_AUTHOR_DIALOG";
export const CLOSE_NEW_AUTHOR_DIALOG = "CLOSE_NEW_AUTHOR_DIALOG";
export const OPEN_EDIT_AUTHOR_DIALOG = "OPEN_EDIT_AUTHOR_DIALOG";
export const CLOSE_EDIT_AUTHOR_DIALOG = "CLOSE_EDIT_AUTHOR_DIALOG";

export function getAuthorById(authorId) {
  const request = axios.get(
    `https://libraryhcmute.herokuapp.com/app/authors/${authorId}`
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
  const request = axios.post(
    `https://libraryhcmute.herokuapp.com/app/authors`,
    { author }
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: ADD_AUTHOR,
        data: response.data
      })
    );
}

export function updateAuthor(author) {
  const request = axios.get(`https://libraryhcmute.herokuapp.com/app/authors`, {
    author
  });

  return dispatch =>
    request.then(response =>
      dispatch({
        type: UPDATE_AUTHOR,
        data: response.data
      })
    );
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
