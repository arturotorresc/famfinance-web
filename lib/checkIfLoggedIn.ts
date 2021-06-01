import { GetServerSidePropsContext } from "next";
import { QueryClient } from "react-query";
import fetcher from "../fetchers/fetcher";

interface ICheckIfLoggedInRes {
  isLoggedIn: boolean;
  queryClient: QueryClient;
}

/**
 * Checks if the current user is logged in.
 */
export async function checkIfLoggedIn(
  ctx: GetServerSidePropsContext
): Promise<ICheckIfLoggedInRes> {
  const cookie = ctx.req.headers.cookie;
  const fetchOpts = {
    headers: cookie
      ? {
          cookie: cookie,
        }
      : undefined,
  };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("/me", () =>
    fetcher.get("/me", fetchOpts).then((res) => res.data)
  );
  const res = await fetcher.get("/me", {
    ...fetchOpts,
  });
  if (res.data.user) {
    return { isLoggedIn: true, queryClient };
  }
  return { isLoggedIn: false, queryClient };
}
