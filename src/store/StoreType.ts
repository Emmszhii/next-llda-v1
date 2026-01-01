export interface StoreState {
  error: boolean;
  message: string;
  success: boolean;
  is_show: boolean;
  archive: boolean;
  delete: boolean;
  restore: boolean;
  is_add: boolean;
  is_search: boolean;
}

export type StoreAction =
  | { type: "ERROR"; error: boolean }
  | { type: "MESSAGE"; message: string }
  | { type: "SUCCESS"; success: boolean }
  | { type: "IS_SHOW"; is_show: boolean }
  | { type: "ARCHIVE"; archive: boolean }
  | { type: "DELETE"; delete: boolean }
  | { type: "RESTORE"; restore: boolean }
  | { type: "IS_ADD"; is_add: boolean }
  | { type: "IS_SEARCH"; is_search: boolean };
