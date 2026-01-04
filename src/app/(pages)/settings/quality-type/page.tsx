"use client";
import Layout from "@/src/app/(components)/Layout";

export default function Dashboard() {
  // const {
  //   isLoading,
  //   isFetching,
  //   data: data,
  // } = useQueryData(`/controllers/system-users`, "get", "");

  return (
    <>
      <Layout menu="settings" submenu="quality-type">
        <div></div>
      </Layout>
    </>
  );
}
