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
  
  const newLanguageState = {
    name: "",
    createDate: new Date(),
    updateDate: new Date(),
    note: ""
  };
  
  function LanguageDialog() {
    const dialog = useSelector(state => state.language.languageDialog);
    const dispatch = useDispatch();
    // const author = useState({});
    const { form, handleChange, setForm } = useForm(newLanguageState);
  
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
          ...newLanguageState,
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
        ? dispatch(Action.Language.LanguageAction.closeEditLanguageDialog())
        : dispatch(Action.Language.LanguageAction.closeNewLanguageDialog());
    }
  
    function onSubmit(event) {
      event.preventDefault();
  
      if (dialog.type === "new") {
        dispatch(Action.Language.LanguageAction.addLanguage(form));
      } else {
        dispatch(Action.Language.LanguageAction.updateLanguage(form));
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
          {dialog.type === "edit" ? "Chỉnh Sửa Ngôn Ngữ" : "Tạo Mới Ngôn Ngữ"}
        </DialogTitle>
        <div className="flex px-20">
          <TextField
            className="mb-24"
            label="Tên Ngôn Ngữ"
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
  
  export default LanguageDialog;
  