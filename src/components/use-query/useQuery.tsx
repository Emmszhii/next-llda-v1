"use client";
import axios from "axios";
import { devApiVersion } from "../helper/helper-functions";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

export default function queryData(
  endpoint: string,
  method: Methods = "get",
  fd = {}
) {
  let url = `${endpoint}`;
  let username = "";
  let password = "";
  let auth = btoa(`${username}:${password}`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + auth);
  myHeaders.append("Content-Type", "application/json");

  let options: Object = {
    method,
    headers: myHeaders,
    body: "",
  };

  if (method !== "get") {
    options = {
      ...options,
      body: JSON.stringify(fd),
    };
  }

  const data = axios[method](url, fd, options);
  return data;
}
