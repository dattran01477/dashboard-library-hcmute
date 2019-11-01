import * as Action from "../action";

const initialState = {
  author: {},
  authorDialog: {
    type: "new",
    props: {
      open: false
    },
    data: {}
  },
  statusAction: null
};

export default function author(state = initialState, action) {
  switch (action.type) {
    case Action.AuthorAction.GET_AUTHOR:
      return {
        ...state,
        author: action.data
      };
    case Action.AuthorAction.ADD_AUTHOR:
      return {
        ...state
      };
    case Action.AuthorAction.UPDATE_AUTHOR:
      return {
        ...state
      };
    case Action.AuthorAction.OPEN_NEW_AUTHOR_DIALOG: {
      return {
        ...state,
        authorDialog: {
          type: "new",
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Action.AuthorAction.CLOSE_NEW_AUTHOR_DIALOG: {
      return {
        ...state,
        authorDialog: {
          type: "new",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.AuthorAction.OPEN_EDIT_AUTHOR_DIALOG: {
      return {
        ...state,
        authorDialog: {
          type: "edit",
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Action.AuthorAction.CLOSE_EDIT_AUTHOR_DIALOG: {
      return {
        ...state,
        authorDialog: {
          type: "edit",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.AuthorAction.SET_STATUS_ACTION: {
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
