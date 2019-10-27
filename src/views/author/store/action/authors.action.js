export const GET_AUTHORS="GET_AUTHORS";


export function getAuthors(object) {
    return {
      type: GET_AUTHORS,
      data: object
    };
  }