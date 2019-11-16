import * as Action from "../action";

const initialState = {
  borrowing: {},
  borrowingDialog: {
    type: "new",
    props: {
      open: false
    },
    data: {}
  },
  statusAction: null
};

export default function borrowing(state = initialState, action) {
  switch (action.type) {
    case Action.BorrowingAction.GET_BORROWING:
      return {
        ...state,
        borrowing: action.data
      };
    case Action.BorrowingAction.ADD_BORROWING:
      return {
        ...state
      };
    case Action.BorrowingAction.UPDATE_BORROWING:
      return {
        ...state
      };
    case Action.BorrowingAction.OPEN_NEW_BORROWING_DIALOG: {
      return {
        ...state,
        borrowingDialog: {
          type: "new",
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Action.BorrowingAction.CLOSE_NEW_BORROWING_DIALOG: {
      return {
        ...state,
        borrowingDialog: {
          type: "new",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.BorrowingAction.OPEN_EDIT_BORROWING_DIALOG: {
      return {
        ...state,
        borrowingDialog: {
          type: "edit",
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Action.BorrowingAction.CLOSE_EDIT_BORROWING_DIALOG: {
      return {
        ...state,
        borrowingDialog: {
          type: "edit",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.BorrowingAction.SET_STATUS_ACTION: {
      console.log(action.statusAction)
      return {
        ...state,
        statusAction: action.statusAction
      };
    }
    default:
      return state;
  }
}
