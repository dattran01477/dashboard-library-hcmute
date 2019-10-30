import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";
import AuthorDialog from "./AuthorsDialog";

const columns = [
  {
    Header: "Tên Tác Giả",
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
  }
];

function Icons() {
  const data = useSelector(state => state.authors.data);
  const criteria = useSelector(state => state.authors.criteria);
  const dispatch = useDispatch();

  const [authors, setAuthors] = useState();

  useEffect(() => {
    dispatch(Action.Author.AuthorsAction.getAuthors(criteria));
  }, [criteria]);

  useEffect(() => {
    if (data != null) {
      setAuthors(data.content);
    }
  }, [data]);
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
                        dispatch(
                          Action.Author.AuthorAction.openEditContactDialog(
                            rowInfo.original
                          )
                        );
                      }
                    }
                  };
                }}
                data={authors}
                columns={columns}
                defaultPageSize={5}
              />
            </Card>
          </div>
        </Row>
      </Container>
      <AuthorDialog />
    </>
  );
}

export default Icons;
