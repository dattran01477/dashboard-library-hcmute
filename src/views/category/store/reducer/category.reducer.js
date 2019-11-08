import * as Action from "../action";

const initialState = {
  category: {},
  categoryDialog: {
    type: "new",
    props: {
      open: false
    },
    data: {}
  },
  statusAction: null
};

export default function category(state = initialState, action) {
  switch (action.type) {
    case Action.CategoryAction.GET_CATEGORY:
      return {
        ...state,
        category: action.data
      };
    case Action.CategoryAction.ADD_CATEGORY:
      return {
        ...state
      };
    case Action.CategoryAction.UPDATE_CATEGORY:
      return {
        ...state
      };
    case Action.CategoryAction.OPEN_NEW_CATEGORY_DIALOG: {
      return {
        ...state,
        categoryDialog: {
          type: "new",
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Action.CategoryAction.CLOSE_NEW_CATEGORY_DIALOG: {
      return {
        ...state,
        categoryDialog: {
          type: "new",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.CategoryAction.OPEN_EDIT_CATEGORY_DIALOG: {
      return {
        ...state,
        categoryDialog: {
          type: "edit",
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Action.CategoryAction.CLOSE_EDIT_CATEGORY_DIALOG: {
      return {
        ...state,
        categoryDialog: {
          type: "edit",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.CategoryAction.SET_STATUS_ACTION: {
      return {
        ...state,
        statusAction: action.statusAction
      };
    }
    default:
      return state;
  }
}
