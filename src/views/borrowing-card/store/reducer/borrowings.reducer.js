import * as Action from "../action";

const initialState = {
  data: [],
  criteria: {
    pageIndex: 0,
    pageSize: 25,
    query: "",
    sortDirection: "DESC",
    sortField: "create_date"
  }
};

export default function borrowings(state = initialState, action) {
  switch (action.type) {
    case Action.BorrowingsAction.GET_BORROWINGS:
      return {
        ...state,
        data: action.data
      };
    case Action.BorrowingsAction.CHANGE_CRITERIA:
      return {
        ...state,
        criteria: action.criteria
      };
    default:
      return state;
  }
}
