import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../@core/hooks/useForm";
import * as Action from "../../store/action";

const newAuthorState = {
  status: ""
};

function BorrowingDialog() {
  const dialog = useSelector(state => state.borrowing.borrowingDialog);
  const dispatch = useDispatch();
  let stompClient = useSelector(state => state.borrowing.stompClient);
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
    stompClient.send("/apps/addNew", {}, JSON.stringify(data));
  }

  function closeDialog() {
    dialog.type === "edit"
      ? dispatch(Action.Borrowing.BorrowingAction.closeEditBorrowingDialog())
      : dispatch(Action.Borrowing.BorrowingAction.closeNewBorrowingDialog());
  }

  function onSubmit(event) {
    event.preventDefault();

    if (dialog.type === "new") {
      // dispatch(Action.Author.AuthorAction.addAuthor(form));
      onclickSendData(form);
    } else {
      dispatch(Action.Borrowing.BorrowingAction.updateBorrowing(form));
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
        {dialog.type === "edit" ? "Cập nhật trạng thái phiếu mượn" : "Tạo mới phiếu mượn"}
      </DialogTitle>
      <div className="flex px-20">
        
        <FormControl variant="outlined" fullWidth>
          <InputLabel  htmlFor="outlined-age-native-simple">
            status
          </InputLabel>
          <Select
            native
            value={form.status}
            onChange={handleChange}
            inputProps={{
              name: "status",
              id: "outlined-age-native-simple"
            }}
          >
            <option value="" />
            <option value="Active">Active</option>
            <option value="Waiting">Waiting</option>
            <option value="Cancel">Cancel</option>
            <option value="Returned">Returned</option>
          </Select>
        </FormControl>
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

export default BorrowingDialog;
