import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Book from "./Book";
import Books from "./Books";

function BookConfig(props) {
  return (
    <Switch>>
      <Route path="/admin/book" exact component={Books} />
      <Route path="/admin/book/:idBook"  exact component={Book} />
    </Switch>
  );
}

export default BookConfig;
