import { combineReducers } from "redux";
import authors from "./reducer/authors.reducer";

const reducer = combineReducers({
  authors
});



export default reducer;