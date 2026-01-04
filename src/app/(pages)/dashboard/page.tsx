"use client";
import useQueryData from "@/src/components/use-query/useQueryData";
import Layout from "../../(components)/Layout";

export default function Dashboard() {
  const {
    isLoading,
    isFetching,
    data: data,
  } = useQueryData(`/controllers/system-users`, "get", "");

  return (
    <>
      <Layout menu="dashboard" submenu="">
        <div></div>
      </Layout>
    </>
  );
}
