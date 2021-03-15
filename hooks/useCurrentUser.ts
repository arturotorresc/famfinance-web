import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function useCurrentUser() {
  const value = useContext(CurrentUserContext);
  return value;
}
