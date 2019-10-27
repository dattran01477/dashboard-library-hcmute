import * as Action from "../action";

const initialState = {
  data: []
};

export default function authors(state = initialState, action) {
  switch (action.type) {
    case Action.AuthorsAction.GET_AUTHORS:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
