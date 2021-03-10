import React, { createContext, useState } from "react";

interface ICurrentUserContext {
  user: any;
  handleSetUser: (user: any) => void;
  logout: () => void;
}

const defaultValue: ICurrentUserContext = {
  user: null,
  handleSetUser: (user: any) => {},
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

  const handleSetUser = (user: any) => {
    setUser(user);
  };

  const value = {
    user,
    handleSetUser,
    logout: () => handleSetUser({}),
  };

  return <Provider value={value}>{children}</Provider>;
};
