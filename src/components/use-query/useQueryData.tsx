"use client";
import { useQuery } from "@tanstack/react-query";
import queryData from "./useQuery";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

export default function useQueryData(
  endpoint: string,
  method: Methods = "get",
  key = "",
  fd = {},
  id = null,
  refresh = false
) {
  const result = useQuery({
    queryKey: [key, id],
    queryFn: async () => await queryData(endpoint, method, fd),
    retry: false,
    refetchOnWindowFocus: refresh,
    gcTime: 200,
  });

  return result;
}
