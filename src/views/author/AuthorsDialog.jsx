import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../@core/hooks/useForm";
import * as Action from "../../store/action";

const newAuthorState = {
  name: "",
  createDate: new Date(),
  updateDate: new Date()
};

function AuthorDialog() {
  const dialog = useSelector(state => state.author.authorDialog);
  const dispatch = useDispatch();
  let stompClient = useSelector(state => state.authors.stompClient);
  // const author = useState({});
  const { form, handleChange, setForm } = useForm(newAuthorState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (dialog.type === "edit" && dialog.data) {
      setForm({ ...dialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (dialog.type === "new") {
      setForm({
        ...newAuthorState,
        ...dialog.data
      });
    }
  }, [dialog.data, dialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (dialog.props.open) {
      initDialog();
    }
  }, [dialog.props.open, initDialog]);

  function onclickSendData(data) {
    stompClient.send(
      "/apps/addNew",
      {},
      JSON.stringify(data)
    );
  }

  function closeDialog() {
    dialog.type === "edit"
      ? dispatch(Action.Author.AuthorAction.closeEditContactDialog())
      : dispatch(Action.Author.AuthorAction.closeNewContactDialog());
  }

  function onSubmit(event) {
    event.preventDefault();

    if (dialog.type === "new") {
      // dispatch(Action.Author.AuthorAction.addAuthor(form));
      onclickSendData(form);
    } else {
      dispatch(Action.Author.AuthorAction.updateAuthor(form));
    }
    closeDialog();
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
      <DialogTitle id="simple-dialog-title">
        {dialog.type === "edit" ? "Chỉnh Sửa Tác Giả" : "Tạo Mới Tác Giả"}
      </DialogTitle>
      <div className="flex px-20">
        <TextField
          className="mb-24"
          label="Tên Tác Giả"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </div>

      <DialogActions className="justify-between pl-16">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onSubmit}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthorDialog;
