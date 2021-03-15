import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import fetcher from "../fetchers/fetcher";

interface IUserObject {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  role: string;
}

interface ICurrentUserContext {
  user: IUserObject | null;
  logout: () => void;
}

const defaultValue: ICurrentUserContext = {
  user: null,
  logout: () => {},
};

export const CurrentUserContext = createContext(defaultValue);

const Provider = CurrentUserContext.Provider;

export const CurrentUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const { data, isError, isLoading } = useQuery("/me", () =>
    fetcher.get("/me").then((res) => res.data)
  );

  useEffect(() => {
    if (isLoading) {
      setUser(null);
    }

    if (isError) {
      setUser(null);
    }

    if (data) {
      setUser(data.user);
    }
  }, [data, isError, isLoading]);

  const value = {
    user,
    logout: () => setUser(null),
  };

  return <Provider value={value}>{children}</Provider>;
};
