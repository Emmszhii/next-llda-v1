import { StoreAction } from "./StoreType";

export const setError = (val: boolean): StoreAction => ({
  type: "ERROR",
  error: val,
});
export const setMessage = (val: string): StoreAction => ({
  type: "MESSAGE",
  message: val,
});
export const setSuccess = (val: boolean): StoreAction => ({
  type: "SUCCESS",
  success: val,
});
export const setIsShow = (val: boolean): StoreAction => ({
  type: "IS_SHOW",
  is_show: val,
});
export const setIsArchive = (val: boolean): StoreAction => ({
  type: "ARCHIVE",
  archive: val,
});
export const setIsDelete = (val: boolean): StoreAction => ({
  type: "DELETE",
  delete: val,
});
export const setIsRestore = (val: boolean): StoreAction => ({
  type: "RESTORE",
  restore: val,
});
export const setIsAdd = (val: boolean): StoreAction => ({
  type: "IS_ADD",
  is_add: val,
});
export const setIsSearch = (val: boolean): StoreAction => ({
  type: "IS_SEARCH",
  is_search: val,
});
