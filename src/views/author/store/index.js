import { combineReducers } from "redux";
import authors from "./reducer/authors.reducer";
import author from "./reducer/author.reducer";

const reducer = combineReducers({
  authors,
  author
});



export default reducer;