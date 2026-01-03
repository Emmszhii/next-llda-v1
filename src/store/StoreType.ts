export interface StoreState {
  error: boolean;
  message: string;
  success: boolean;
  is_show: boolean;
  is_header_show: boolean;
  archive: boolean;
  delete: boolean;
  restore: boolean;
  is_add: boolean;
  is_search: boolean;
  is_login: boolean;
  credentials: object;
}

export type StoreAction =
  | { type: "ERROR"; error: boolean }
  | { type: "MESSAGE"; message: string }
  | { type: "SUCCESS"; success: boolean }
  | { type: "IS_SHOW"; is_show: boolean }
  | { type: "IS_HEADER_SHOW"; is_header_show: boolean }
  | { type: "ARCHIVE"; archive: boolean }
  | { type: "DELETE"; delete: boolean }
  | { type: "RESTORE"; restore: boolean }
  | { type: "IS_ADD"; is_add: boolean }
  | { type: "CREDENTIALS"; credentials: object }
  | { type: "IS_LOGIN"; is_login: boolean }
  | { type: "IS_SEARCH"; is_search: boolean };
