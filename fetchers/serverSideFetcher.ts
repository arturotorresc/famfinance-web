import axios from "axios";
import { GetServerSidePropsContext } from "next";

export function createServerSideFetcher(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie;
  const fetcher = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
      cookie,
    },
  });
  return fetcher;
}
