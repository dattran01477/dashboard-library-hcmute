import * as Action from "../action";

const initialState = {
  data: [],
  criteria: {
    pageIndex: 0,
    pageSize: 25,
    query: "",
    sortDirection: "DESC",
    sortField: ""
  },
  stompClient: null
};

export default function authors(state = initialState, action) {
  switch (action.type) {
    case Action.AuthorsAction.GET_AUTHORS:
      console.log(action.data);
      return {
        ...state,
        data: action.data
      };
    case Action.AuthorsAction.CHANGE_CRITERIA:
      return {
        ...state,
        criteria: action.criteria
      };
    case Action.AuthorsAction.SET_STOMP_CLIENT:
      return {
        ...state,
        stompClient: action.stomp
      };
    default:
      return state;
  }
}
