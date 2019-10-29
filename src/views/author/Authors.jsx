/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// core components
import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";

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
  const dispatch = useDispatch();

  const [authors, setAuthors] = useState();

  useEffect(() => {
    dispatch(Action.Author.AuthorsAction.getAuthors("abc"));
  });

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
                      onClick  : (e, handleOriginal) => {
                          if ( rowInfo )
                          {
                              console.log(rowInfo.original)
                          }
                      }
                  }
              }}
                data={authors}
                columns={columns}
                defaultPageSize={5}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Icons;
