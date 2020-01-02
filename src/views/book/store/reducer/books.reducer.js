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
    default:
      return state;
  }
}
