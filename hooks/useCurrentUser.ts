import { useRouter } from "next/router";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

interface ICurrentUserOptions {
  redirectTo: string;
}

export function useCurrentUser(opts?: ICurrentUserOptions) {
  const value = useContext(CurrentUserContext);
  const router = useRouter();
  const notLoggedIn = value.user === null || value.user === undefined;
  if (opts && notLoggedIn) {
    router.push(opts.redirectTo);
  }
  return value;
}
