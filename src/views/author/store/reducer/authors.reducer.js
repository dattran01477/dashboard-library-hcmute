import * as Action from "../action";

const initialState = {
  data: [],
  criteria: {
    pageIndex: 0,
    pageSize: 25,
    query: "",
    sortDirection: "ASC",
    sortField: ""
  }
};

export default function authors(state = initialState, action) {
  switch (action.type) {
    case Action.AuthorsAction.GET_AUTHORS:
      return {
        ...state,
        data: action.data
      };
    case Action.AuthorsAction.CHANGE_CRITERIA:
      return {
        ...state,
        criteria: action.criteria
      };
    default:
      return state;
  }
}
