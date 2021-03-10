import fetcher from "../fetchers/fetcher";

/**
 * Checks if the current user is logged in.
 */
export async function checkIfLoggedIn() {
  const res = await fetcher.get("/me");
  if (res.data.user) {
    return true;
  }
  return false;
}
