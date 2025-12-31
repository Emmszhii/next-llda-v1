import dynamic from "next/dynamic";
import React from "react";
import LoadingBar from "../loading/LoadingBar";

const DynamicImportByName = (componentPathName = "", options = {}) => {
  // next/dynamic handles both default and named exports
  if (componentPathName != "") {
    return dynamic(() => import(componentPathName), {
      loading: () => <LoadingBar />,
      ...options,
    });
  }

  // Handle cases where the component name is not found
  return dynamic(() =>
    Promise.resolve(() => <div>Component not found: {componentPathName}</div>)
  );
};

export default DynamicImportByName;
