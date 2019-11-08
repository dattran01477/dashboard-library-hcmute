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

export default function languages(state = initialState, action) {
  switch (action.type) {
    case Action.LanguagesAction.GET_LANGUAGES:
      return {
        ...state,
        data: action.data
      };
    case Action.LanguagesAction.CHANGE_CRITERIA:
      return {
        ...state,
        criteria: action.criteria
      };
    default:
      return state;
  }
}
