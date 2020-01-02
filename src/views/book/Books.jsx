import { Fab, Icon, IconButton } from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";
function Books(props) {
  const [data, setData] = useState(null);
  const criteria = useSelector(state => state.books.criteria);
  const dispatch = useDispatch();

  useEffect(() => {
    Action.Book.getBooks(criteria, getBookSuccess, getBookFail);
  }, []);

  function getBookSuccess(data) {
    setData(data);
  }

  function getBookFail(code) {}

  const columns = [
    {
      Header: "Tên sách",
      accessor: "name"
    },
    {
      Header: "Ngày Tạo",
      accessor: "createDate",
      Cell: row => <DateFormat date={row.value} />
    },
    {
      Header: "Ngày Chỉnh Sửa",
      accessor: "updateDate",
      Cell: row => <DateFormat date={row.value} />
    },
    {
      Header: "",
      width: 128,
      Cell: row => (
        <div className="flex items-center">
          <IconButton
            onClick={ev => {
              ev.stopPropagation();
              dispatch(
                Action.Author.AuthorAction.deleteAuthor(row.original.id)
              );
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </div>
      )
    }
  ];

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
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              {/* content */}
              <ReactTable
                getTrProps={(state, rowInfo, column) => {
                  return {
                    className: "cursor-pointer",
                    onClick: (e, handleOriginal) => {
                      if (rowInfo) {
                        props.history.push(
                          `/admin/book/${rowInfo.original.id}`
                        );
                      }
                    }
                  };
                }}
                data={(data && data.content) || []}
                columns={columns}
                defaultPageSize={5}
                pages={(data && data.totalPages) || []}
                manual
                noDataText="No contacts found"
              />
            </Card>
          </div>
        </Row>

        <Fab
          color="primary"
          aria-label="add"
          onClick={ev =>
            dispatch(Action.Author.AuthorAction.openNewContactDialog())
          }
        >
          <Icon>person_add</Icon>
        </Fab>
      </Container>
    </>
  );
}

export default Books;
