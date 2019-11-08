import Header from "components/Headers/Header.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Icon, Fab } from "@material-ui/core";
import ReactTable from "react-table";
import { Card, CardHeader, Container, Row } from "reactstrap";
import * as Action from "../../store/action";
import DateFormat from "../../ultils/datetime";
import LanguageDialog from "./LanguageDialog.jsx";
import * as constants from "../../constants";

function LanguageList() {
  const data = useSelector(state => state.languages.data);
  const criteria = useSelector(state => state.languages.criteria);
  const statusAction = useSelector(state => state.category.statusAction);
  const dispatch = useDispatch();

  const [languages, setLanguages] = useState();
  const [pagging, setPagging] = useState({});

  const columns = [
    {
      Header: "Tên Ngôn Ngữ",
      accessor: "name",
    },
    {
      Header: "Mã Ngôn Ngữ",
      accessor: "code",
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
                Action.Language.LanguageAction.deleteLanguage(row.original.id)
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
    dispatch(Action.Language.LanguagesAction.getLanguages(criteria));
  }, [criteria]);

  useEffect(() => {
    if (data != null) {
      setLanguages(data.content);
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (statusAction === constants.STATUS_ACTION_SUCCESSED) {
      dispatch(Action.Language.LanguagesAction.getLanguages(criteria));
      dispatch(Action.Language.LanguageAction.setStatusAction(null));
    }
    if (statusAction === constants.STATUS_ACTION_FAILED) {
      console.log("languages action failed!");
      dispatch(Action.Language.LanguageAction.setStatusAction(null));
    }
  }, [statusAction]);

  useEffect(() => {
    pagging &&
      dispatch(
        Action.Language.LanguagesAction.changeCriteria({
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
                <h3 className="mb-0">Quản Lý Ngôn Ngữ</h3>
              </CardHeader>
              {/* content */}
              <ReactTable
                getTrProps={(state, rowInfo, column) => {
                  return {
                    className: "cursor-pointer",
                    onClick: (e, handleOriginal) => {
                      if (rowInfo) {
                        dispatch(
                          Action.Language.LanguageAction.openEditLanguageDialog(
                            rowInfo.original
                          )
                        );
                      }
                    }
                  };
                }}
                data={languages}
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
            dispatch(Action.Language.LanguageAction.openNewLanguageDialog())
          }
        >
          <Icon>person_add</Icon>
        </Fab>
      </Container>
      <LanguageDialog />
    </>
  );
}

export default LanguageList;
