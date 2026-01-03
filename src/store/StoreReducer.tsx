import { StoreState, StoreAction } from "./StoreType";

export const initialState: StoreState = {
  error: false,
  message: "",
  success: false,
  is_show: false,
  is_header_show: false,
  archive: false,
  delete: false,
  restore: false,
  is_add: false,
  is_search: false,
  is_login: false,
  is_settings_open: false,
  is_nav_full_open: false,
  credentials: {},
};

export const StoreReducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "MESSAGE":
      return {
        ...state,
        message: action.message,
      };
    case "SUCCESS":
      return {
        ...state,
        success: action.success,
      };
    case "IS_SHOW":
      return {
        ...state,
        is_show: action.is_show,
      };
    case "IS_HEADER_SHOW":
      return {
        ...state,
        is_header_show: action.is_header_show,
      };
    case "ARCHIVE":
      return {
        ...state,
        archive: action.archive,
      };
    case "DELETE":
      return {
        ...state,
        delete: action.delete,
      };
    case "RESTORE":
      return {
        ...state,
        restore: action.restore,
      };
    case "IS_ADD":
      return {
        ...state,
        is_add: action.is_add,
      };
    case "IS_SEARCH":
      return {
        ...state,
        is_search: action.is_search,
      };
    case "IS_SETTINGS_OPEN":
      return {
        ...state,
        is_settings_open: action.is_settings_open,
      };
    case "IS_NAV_FULL_OPEN":
      return {
        ...state,
        is_nav_full_open: action.is_nav_full_open,
      };
    default:
      return state;
  }
};
