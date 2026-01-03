"use client";
import { devApiVersion } from "@/src/components/helper/helper-functions";
import HeaderAccess from "@/src/components/page/access/HeaderAccess";
import useQueryData from "@/src/components/use-query/useQueryData";
import { useStore } from "@/src/store/StoreContext";
import axios from "axios";
import React from "react";

export default function Dashboard() {
  const {
    isLoading,
    isFetching,
    data: data,
  } = useQueryData(`/controllers/system-users`, "get", "");

  return (
    <>
      <HeaderAccess />
    </>
  );
}
