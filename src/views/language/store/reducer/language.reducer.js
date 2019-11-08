import * as Action from "../action";

const initialState = {
  language: {},
  languageDialog: {
    type: "new",
    props: {
      open: false
    },
    data: {}
  },
  statusAction: null
};

export default function language(state = initialState, action) {
  switch (action.type) {
    case Action.LanguageAction.GET_LANGUAGE:
      return {
        ...state,
        language: action.data
      };
    case Action.LanguageAction.ADD_LANGUAGE:
      return {
        ...state
      };
    case Action.LanguageAction.UPDATE_LANGUAGE:
      return {
        ...state
      };
    case Action.LanguageAction.OPEN_NEW_LANGUAGE_DIALOG: {
      return {
        ...state,
        languageDialog: {
          type: "new",
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Action.LanguageAction.CLOSE_NEW_LANGUAGE_DIALOG: {
      return {
        ...state,
        languageDialog: {
          type: "new",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.LanguageAction.OPEN_EDIT_LANGUAGE_DIALOG: {
      return {
        ...state,
        languageDialog: {
          type: "edit",
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Action.LanguageAction.CLOSE_EDIT_LANGUAGE_DIALOG: {
      return {
        ...state,
        languageDialog: {
          type: "edit",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Action.LanguageAction.SET_STATUS_ACTION: {
      return {
        ...state,
        statusAction: action.statusAction
      };
    }
    default:
      return state;
  }
}
