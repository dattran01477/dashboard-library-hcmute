import React from "react";
import Moment from "react-moment";

export default function dateToFormat({ date }) {
  return <Moment>{date}</Moment>;
}
