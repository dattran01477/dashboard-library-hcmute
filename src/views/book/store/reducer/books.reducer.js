import * as Action from "../action";

const initialState = {
  data: [],
  criteria: {
    pageIndex: 0,
    pageSize: 25,
    query: "",
    sortDirection: "DESC",
    sortField: ""
  }
};

export default function categoryies(state = initialState, action) {
  switch (action.type) {
    case Action.CategoriesAction.GET_CATEGORIES:
      return {
        ...state,
        data: action.data
      };
    case Action.CategoriesAction.CHANGE_CRITERIA:
      return {
        ...state,
        criteria: action.criteria
      };
    default:
      return state;
  }
}
