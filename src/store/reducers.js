import { combineReducers } from "redux";
import author from "../views/author/store/reducer/author.reducer";
import authors from "../views/author/store/reducer/authors.reducer";
import categories from "../views/category/store/reducer/categories.reducer";
import category from "../views/category/store/reducer/category.reducer";
import language from "../views/language/store/reducer/language.reducer";
import languages from "../views/language/store/reducer/languages.reducer";

const reducer = combineReducers({
  authors,
  author,
  categories,
  category,
  language,
  languages
});

export default reducer;
