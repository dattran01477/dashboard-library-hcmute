import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Icon, Fab } from "@material-ui/core";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";
import CategoryDialog from "./CategoryDialog.jsx";
import * as constants from "../../constants";

function CategoryList() {
  const data = useSelector(state => state.categories.data);
  const criteria = useSelector(state => state.categories.criteria);
  const statusAction = useSelector(state => state.category.statusAction);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState();
  const [pagging, setPagging] = useState({});

  const columns = [
    {
      Header: "Tên Tác Giả",
      accessor: "name",
    },
    {
      Header: "Tổng Số Sách",
      accessor: "bookTotal",
      className: "flex justify-center"
    },
    {
      Header: "Thứ Hạng",
      accessor: "rank",
      className: "flex justify-center"
    },
    {
      Header: "Trạng Thái",
      accessor: "status",
      className: "flex justify-center"
    },
    {
      Header: "Ngày Tạo",
      bookTotal: "createDate",
      className: "flex justify-center",
      Cell: row => <DateFormat date={row.value} />
    },
    {
      Header: "Ngày Chỉnh Sửa",
      rank: "updateDate",
      className: "flex  justify-center",
      Cell: row => <DateFormat date={row.value} />
    },
    {
      Header: "",
      width: 128,
      className: "flex  justify-center",
      Cell: row => (
        <div className="flex items-center">
          <IconButton
            onClick={ev => {
              ev.stopPropagation();
              dispatch(
                Action.Category.CategoryAction.deleteCategory(row.original.id)
              );
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </div>
      )
    }
  ];

  useEffect(() => {
    dispatch(Action.Category.CategoriesAction.getCategories(criteria));
  }, [criteria]);

  useEffect(() => {
    if (data != null) {
      setCategories(data.content);
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (statusAction === constants.STATUS_ACTION_SUCCESSED) {
      dispatch(Action.Category.CategoriesAction.getCategories(criteria));
      dispatch(Action.Category.CategoryAction.setStatusAction(null));
    }
    if (statusAction === constants.STATUS_ACTION_FAILED) {
      console.log("categories action failed!");
      dispatch(Action.Category.CategoryAction.setStatusAction(null));
    }
  }, [statusAction]);

  useEffect(() => {
    pagging &&
      dispatch(
        Action.Category.CategoriesAction.changeCriteria({
          ...criteria,
          pageIndex: pagging.pageIndex,
          pageSize: pagging.pageSize
        })
      );
  }, [pagging]);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Quản Lý Danh Mục</h3>
              </CardHeader>
              {/* content */}
              <ReactTable
                getTrProps={(state, rowInfo, column) => {
                  return {
                    className: "cursor-pointer",
                    onClick: (e, handleOriginal) => {
                      if (rowInfo) {
                        dispatch(
                          Action.Category.CategoryAction.openEditCategoryDialog(
                            rowInfo.original
                          )
                        );
                      }
                    }
                  };
                }}
                data={categories}
                columns={columns}
                defaultPageSize={5}
                pages={data.totalPages}
                manual
                onFetchData={(state, instance) => {
                  setPagging({
                    pageIndex: state.page,
                    pageSize: state.pageSize
                  });
                }}
                noDataText="No contacts found"
              />
            </Card>
          </div>
        </Row>

        <Fab
          color="primary"
          aria-label="add"
          onClick={ev =>
            dispatch(Action.Category.CategoryAction.openNewCategoryDialog())
          }
        >
          <Icon>person_add</Icon>
        </Fab>
      </Container>
      <CategoryDialog />
    </>
  );
}

export default CategoryList;
