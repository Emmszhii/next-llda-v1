import dynamic from "next/dynamic";
import { ComponentType } from "react";
import LoadingBar from "../partials/loading/LoadingBar";

type DynamicImportOptions = {
  ssr?: boolean;
  loading?: ComponentType;
};

export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
) {
  return dynamic(importFn, {
    ssr: options.ssr ?? false,
    loading: options.loading ? () => <LoadingBar /> : undefined,
  });
}
