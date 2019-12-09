import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import * as Action from "../../store/action";
import useForm from "../../@core/hooks/useForm";
import uuid from "uuid/v1";

const newBook = {
  amountBook: 0,
  authors: {},
  bookLocation: {},
  categories: [],
  clickViewTotal: 0,
  isbn: uuid(),
  language: {},
  longDescription: "",
  name: "",
  numberPages: 0,
  pageSize: "",
  publisher: {},
  releasedDate: "",
  releasedNumber: 0,
  releasedTime: 0,
  reprint: 0,
  shortDescription: "",
  status: "publish",
  thumbnail: ""
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

function Book(props) {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { form, setForm, handleChange } = useForm(newBook);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const initDialog = useCallback(() => {
    if (props.match.params.idBook === "new") {
      setForm({ ...newBook });
    } else {
      setForm({});
    }
  }, [setForm]);

  useEffect(() => {
    initDialog();
    Action.Book.getAuthors(onSuccessGetAuthorsOption);
    Action.Book.getCategories(onSuccessGetCategoriesOption);
    Action.Book.getLanguages(onSuccessGetLanguagesOption);
    Action.Book.getPublisher(onSuccessGetPublishersOption);
  }, []);

  function onSuccessGetAuthorsOption(data) {
    setAuthors(data.content);
  }

  function onSuccessGetCategoriesOption(data) {
    setCategories(data.content);
  }

  function onSuccessGetPublishersOption(data) {
    setPublishers(data.content);
  }

  function onSuccessGetLanguagesOption(data) {
    setLanguages(data.content);
  }

  return (
    <div>
      <div className="flex flex-row my-4">
        <div className="ml-auto">
          <a href="#" className="mx-2">
            quay lại
          </a>
          <Button
            className="mx-2 bg-blue-300"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </div>
      <Paper className="h-screen overflow-auto">
        <Typography variant="h5" component="h3"></Typography>

        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChangeTab}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
            <Tab label="Hình ảnh video" {...a11yProps(1)} />
            <Tab label="Thông tin chi tiết" {...a11yProps(2)} />
            <Tab label="Nâng cao" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0} className="w-11/12 m-0">
            <div className="flex flex-col ">
              <Typography variant="h6" component="h3" className="font-bold">
                Thông tin cơ bản
              </Typography>

              <div className="mx-auto w-full">
                {/* start name and isbn */}
                <div className="flex flex-row m-4">
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Tên sách"
                      name="name"
                      placeholder="Placeholder"
                      multiline
                      variant="outlined"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Mã ISBN"
                      name="isbn"
                      disabled
                      value={form.isbn}
                      placeholder="Placeholder"
                      multiline
                      variant="outlined"
                    />
                  </FormControl>
                </div>
                {/* end name and isbn */}

                {/* start status and book number */}
                <div className="flex flex-row m-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.status === "publish" ? true : false}
                        value={form.status}
                        name="status"
                        onChange={handleChange}
                      />
                    }
                    className="w-5/12 mx-2 w-full"
                    label="Công khai"
                  />
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Số lượng sách"
                      type="number"
                      value={form.amountBook}
                      onChange={handleChange}
                      placeholder="Tổng số sách"
                      variant="outlined"
                    />
                  </FormControl>
                </div>
                {/* end status and book number */}

                {/* start categories and author */}
                <div className="flex flex-row m-4">
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    fullWidth
                    className="w-5/12 m-2"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Danh Mục Sách
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="categories"
                    >
                      {categories.map(item => (
                        <MenuItem value={item} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    fullWidth
                    className="w-5/12 m-2"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Tác Giả
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="author"
                      onChange={handleChange}
                      value={form.author}
                      renderValue={item => item.name}
                    >
                      {authors.map(item => (
                        <MenuItem value={item} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* end categories and author */}

                {/* start publisher and language */}
                <div className="flex flex-row m-4">
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    fullWidth
                    className="w-5/12 m-2"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Nhà xuất bản
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="publisher"
                      onChange={handleChange}
                      renderValue={item => item.name}
                      value={form.publisher}
                    >
                      {publishers.map(item => (
                        <MenuItem value={item} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    fullWidth
                    className="w-5/12 m-2"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Ngôn ngữ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="language"
                      renderValue={item => item.name}
                      onChange={handleChange}
                      value={form.language}
                    >
                      {languages.map(item => (
                        <MenuItem value={item} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* end publisher and language */}

                <div className="flex flex-row m-4">
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    fullWidth
                    className="w-5/12 m-2"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Vị trí sách
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="flex flex-row m-4">
                  <FormControl className={classes.margins} fullWidth>
                    <TextField
                      rows={3}
                      label="Mô tả ngắn"
                      placeholder="Placeholder"
                      multiline
                      name="shortDescription"
                      onChange={handleChange}
                      value={form.shortDescription}
                      variant="outlined"
                    />
                  </FormControl>
                </div>

                <div className="flex flex-row m-4">
                  <FormControl className={classes.margins} fullWidth>
                    <TextField
                      rows={6}
                      label="Mô tả chi tiết"
                      placeholder="Placeholder"
                      multiline
                      name="longDescription"
                      onChange={handleChange}
                      value={form.longDescription}
                      variant="outlined"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} className="w-11/12 m-0">
            <div className="flex flex-col ">
              <Typography variant="h6" component="h3" className="font-bold">
                Hình ảnh chi tiết
              </Typography>

              <div className="mx-auto w-full">
                <div className="flex flex-row m-4">
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="thumnail"
                      label="Link ảnh thumnail"
                      placeholder="Placeholder"
                      name="thumbnail"
                      value={form.thumbnail}
                      onChange={handleChange}
                      multiline
                      variant="outlined"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} className="w-11/12 m-0">
            <div className="flex flex-col ">
              <Typography variant="h6" component="h3" className="font-bold">
                Thông tin chi tiết
              </Typography>

              <div className="mx-auto w-full">
                <div className="flex flex-row m-4">
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Số trang sách"
                      placeholder="Placeholder"
                      type="number"
                      multiline
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Khổ giấy"
                      placeholder="Placeholder"
                      multiline
                      variant="outlined"
                    />
                  </FormControl>
                </div>

                <div className="flex flex-row m-4">
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Lần in"
                      placeholder="Placeholder"
                      type="number"
                      multiline
                      name="reprint"
                      value={form.reprint}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Lần tái bản"
                      name="releasedTime"
                      valur={form.releasedTime}
                      onChange={handleChange}
                      placeholder="Placeholder"
                      multiline
                      variant="outlined"
                    />
                  </FormControl>
                </div>

                <div className="flex flex-row m-4">
                  <FormControl
                    className={(classes.margin, "mx-2 w-5/12")}
                    fullWidth
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Ngày tái bản"
                      placeholder="Placeholder"
                      type="number"
                      multiline
                      variant="outlined"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item four
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(Book);
