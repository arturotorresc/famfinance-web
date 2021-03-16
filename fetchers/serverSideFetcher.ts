import axios from "axios";
import { GetServerSidePropsContext } from "next";

export function createServerSideFetcher(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie;
  const fetcher = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
      cookie,
    },
  });
  return fetcher;
}
