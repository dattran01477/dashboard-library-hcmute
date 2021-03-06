import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Icon, Fab } from "@material-ui/core";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";
import AuthorDialog from "./AuthorsDialog";
import * as constants from "../../constants";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function Icons() {
  const data = useSelector(state => state.authors.data);
  const criteria = useSelector(state => state.authors.criteria);
  const statusAction = useSelector(state => state.author.statusAction);
  let stompClient = useSelector(state => state.authors.stompClient);
  const dispatch = useDispatch();

  const [authors, setAuthors] = useState();
  const [pagging, setPagging] = useState({});

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

  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe(
      "/topic/borrowing-list",
      onMessageReceived
    );
  }

  function onError(error) {
    console.log("loi roi " + error);
  }

  function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    let abc={data:{...message}};
    console.log(abc);
    // dispatch({type:Action.Author.AuthorsAction.GET_AUTHORS,data:{...message}})
  }

  useEffect(() => {
    var socket = new SockJS("http://localhost:8080/app/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    dispatch(Action.Author.AuthorsAction.setStompClient(stompClient));
  },[]);

  useEffect(() => {
    dispatch(Action.Author.AuthorsAction.getAuthors(criteria));
  }, [criteria]);

  useEffect(() => {
    if (data != null) {
      setAuthors(data.content);
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (statusAction === constants.STATUS_ACTION_SUCCESSED) {
      dispatch(Action.Author.AuthorsAction.getAuthors(criteria));
      dispatch(Action.Author.AuthorAction.setStatusAction(null));
    }
    if (statusAction === constants.STATUS_ACTION_FAILED) {
      console.log("author action failed!");
      dispatch(Action.Author.AuthorAction.setStatusAction(null));
    }
  }, [statusAction]);

  useEffect(() => {
    pagging &&
      dispatch(
        Action.Author.AuthorsAction.changeCriteria({
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
          onClick={ev =>  dispatch(Action.Author.AuthorAction.openNewContactDialog())}
        >
          <Icon>person_add</Icon>
        </Fab>
      </Container>
      <AuthorDialog />
    </>
  );
}

export default Icons;
