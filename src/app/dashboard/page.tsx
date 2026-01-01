import { devApiVersion } from "@/src/components/helper/helper-functions";
import HeaderAccess from "@/src/components/page/access/HeaderAccess";
import { useStore } from "@/src/store/StoreContext";
import axios from "axios";
import React from "react";

export default async function Dashboard() {
  // React.useEffect(async () => {
  //   const res = await axios.get("/api/users/me");
  // }, []);

  // const getData = async () => {
  //   const res = await axios.get(
  //     `/api/${devApiVersion}/controllers/users/login`
  //   );
  //   console.log(res);
  //   return res;
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  // const res = await axios.get("/api/users/me");

  return (
    <>
      <HeaderAccess />
    </>
  );
}
