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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from 'react-table';
// reactstrap components
// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";


const data = [
  {
    name: "Nguyen Van A",
    age: 26,
    friend: {
      name: "Do Van C",
      age: 23
    }
  },
  {
    name: "Dao Thi B",
    age: 22,
    friend: {
      name: "Ngo Trung V",
      age: 24
    }
  },
  {
    name: "Tran Duc C",
    age: 25,
    friend: {
      name: "Ngo Thanh E",
      age: 25
    }
  },
  {
    name: "Le Tien N",
    age: 27,
    friend: {
      name: "Cao Cong G",
      age: 24
    }
  },
  {
    name: "Pham Hoang M",
    age: 26,
    friend: {
      name: "Lai Hai D",
      age: 25
    }
  },
  {
    name: "Duong Van L",
    age: 23,
    friend: {
      name: "Le Hoang M",
      age: 23
    }
  }
];

const columns = [
  {
    Header: "Name",
    accessor: "name" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
  },
  {
    Header: "Age",
    accessor: "age",
    Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
  },
  {
    id: "friendName", // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
    Header: "Friend Name",
    accessor: d => d.friend.name // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
  },
  {
    Header: props => <span>Friend Age</span>, // Tùy biến component Header
    accessor: "friend.age" // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
  }
];

function Icons() {
  const object = useSelector(state => state.authors.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Action.Author.AuthorsAction.getAuthors("abc"));
  });

  useEffect(() => {
    console.log(object);
  }, [object]);
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
              <ReactTable data={data} columns={columns} defaultPageSize={5} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Icons;
