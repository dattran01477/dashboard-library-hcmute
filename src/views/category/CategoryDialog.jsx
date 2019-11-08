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

const newCategoryState = {
  name: "",
  createDate: new Date(),
  updateDate: new Date(),
  bookTotal: 0,
  parent: null,
  status: "ACTIVE",
  rank: 0
};

function CategoryDialog() {
  const dialog = useSelector(state => state.category.categoryDialog);
  const dispatch = useDispatch();
  // const author = useState({});
  const { form, handleChange, setForm } = useForm(newCategoryState);

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
        ...newCategoryState,
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

  function closeDialog() {
    dialog.type === "edit"
      ? dispatch(Action.Category.CategoryAction.closeEditCategoryDialog())
      : dispatch(Action.Category.CategoryAction.closeNewCategoryDialog());
  }

  function onSubmit(event) {
    event.preventDefault();

    if (dialog.type === "new") {
      dispatch(Action.Category.CategoryAction.addCategory(form));
    } else {
      dispatch(Action.Category.CategoryAction.updateCategory(form));
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
        {dialog.type === "edit" ? "Chỉnh Sửa Danh Mục" : "Tạo Mới Danh Mục"}
      </DialogTitle>
      <div className="flex px-20">
        <TextField
          className="mb-24"
          label="Tên Danh Mục"
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

export default CategoryDialog;
