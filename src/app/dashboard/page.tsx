"use client";
import HeaderAccess from "@/src/components/page/access/HeaderAccess";
import {
  NavigationAccessFullWidth,
  Navigations,
} from "@/src/components/page/access/NavigationAccess";
import useQueryData from "@/src/components/use-query/useQueryData";

export default function Dashboard() {
  const {
    isLoading,
    isFetching,
    data: data,
  } = useQueryData(`/controllers/system-users`, "get", "");

  return (
    <>
      <HeaderAccess />
      <NavigationAccessFullWidth />
      <Navigations />
    </>
  );
}
