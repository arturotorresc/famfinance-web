import { GetServerSidePropsContext } from "next";
import fetcher from "../fetchers/fetcher";

/**
 * Checks if the current user is logged in.
 */
export async function checkIfLoggedIn(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie;
  const res = await fetcher.get("/me", {
    headers: cookie
      ? {
          cookie: cookie,
        }
      : undefined,
  });
  if (res.data.user) {
    return true;
  }
  return false;
}
