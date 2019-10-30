import { Dialog, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../store/action";

const newAuthorState = {
  name: "",
  createDate: new Date(),
  updateDate: new Date()
};

function AuthorDialog() {
  const dialog = useSelector(state => state.author.authorDialog);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ ...newAuthorState });

  useEffect(() => {
    if (dialog.type === "edit") {
      setForm({ ...dialog.data });
    }
    if (dialog.type === "new") {
      setForm({ ...newAuthorState });
    }
  }, [dialog]);

  function closeDialog() {
    dialog.type === "edit"
      ? dispatch(Action.Author.AuthorAction.closeEditContactDialog())
      : dispatch(Action.Author.AuthorAction.closeNewContactDialog());
  }
  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...dialog.props}
      onClose={closeDialog}
      fullWidth
      maxWidth="xs"
    >
      <TextField
        className="mb-24"
        label="Name"
        autoFocus
        id="name"
        name="name"
        value={form.name}
        variant="outlined"
        required
        fullWidth
      />
    </Dialog>
  );
}

export default AuthorDialog;
