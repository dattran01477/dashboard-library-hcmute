import { Chip, Fab, Icon } from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import * as constants from "../../constants";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";
import { useAlert } from "react-alert";
import BorrowingDialog from "./BorrowingDialog";

function Borrowing() {
  const data = useSelector(state => state.borrowings.data);
  const criteria = useSelector(state => state.borrowings.criteria);
  const statusAction = useSelector(state => state.borrowing.statusAction);
  let stompClient = useSelector(state => state.borrowings.stompClient);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [borrowings, setBorrowings] = useState();
  const [pagging, setPagging] = useState({});

  const columns = [
    {
      Header: "Người Mượn",
      accessor: "userId"
    },
    {
      Header: "Trạng Thái",
      accessor: "status",
      className: "flex justify-center",
      Cell: row => {
        if (row.value === "active") {
          return <Chip label="Đã Mượn" color="primary" />;
        }
        if (row.value === "waiting") {
          return <Chip label="Đạng Đợi" color="inherit" />;
        }
        if (row.value === "cancel") {
          return <Chip label="Đã Hủy" color="secondary" />;
        }
        if (row.value === "returned") {
          return <Chip label="Đã Trả" color="default" />;
        }
        return null;
      }
    },
    {
      Header: "Loại",
      accessor: "type"
    },
    {
      Header: "Ngày Mượn Sách",
      accessor: "create_date",
      Cell: row => <DateFormat date={row.value} />
    },
    {
      Header: "Ngày Chỉnh Sửa",
      accessor: "borrow_date",
      Cell: row => <DateFormat date={row.value} />
    }
  ];

  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe("/topic/borrowing-list", onMessageReceived);
  }

  function onError(error) {
    console.log("loi roi " + error);
  }

  function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    if (message != null) {
      alert.show("Có phiếu mượn mới, vui lòng kiểm tra.");
    }
    dispatch({
      type: Action.Borrowing.BorrowingsAction.GET_BORROWINGS,
      data: { ...message }
    });
  }

  useEffect(() => {
    var socket = new SockJS("http://localhost:8080/app/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);

    dispatch(Action.Borrowing.BorrowingsAction.setStompClient(stompClient));
  }, []);

  useEffect(() => {
    dispatch(Action.Borrowing.BorrowingsAction.getBorrowings(criteria));
  }, [criteria]);

  useEffect(() => {
    if (data != null) {
      setBorrowings(data.content);
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (statusAction === constants.STATUS_ACTION_SUCCESSED) {
      dispatch(Action.Borrowing.BorrowingsAction.getBorrowings(criteria));
      dispatch(Action.Borrowing.BorrowingAction.setStatusAction(null));
    }
    if (statusAction === constants.STATUS_ACTION_FAILED) {
      console.log("borrowing action failed!");
      dispatch(Action.Borrowing.BorrowingAction.setStatusAction(null));
    }
  }, [statusAction]);

  useEffect(() => {
    pagging &&
      dispatch(
        Action.Borrowing.BorrowingsAction.changeCriteria({
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
                          Action.Borrowing.BorrowingAction.openEditBorrowingDialog(
                            rowInfo.original
                          )
                        );
                      }
                    }
                  };
                }}
                data={borrowings}
                columns={columns}
                defaultPageSize={5}
                noDataText="No contacts found"
              />
            </Card>
          </div>
        </Row>

        <Fab
          color="primary"
          aria-label="add"
          onClick={ev =>
            dispatch(Action.Borrowing.BorrowingAction.openNewBorrowingDialog())
          }
        >
          <Icon>person_add</Icon>
        </Fab>
      </Container>
      <BorrowingDialog />
    </>
  );
}

export default Borrowing;
