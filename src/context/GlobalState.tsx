import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth } from "../Auth";
import { UserData } from "../model/UserData.model";
import http from "../Http";

const USER_V1 = "/api/v1/users";

const useGlobal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    if (Auth.getToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      updateUserData();
    }
  }, [isLoggedIn]);

  const updateUserData = async () => {
    try {
      const { data } = await http.get<UserData>(USER_V1);
      setUserData(data);
    } catch (err) {}
  };

  return {
    state: { isLoggedIn, userData },
    actions: { setIsLoggedIn, updateUserData },
  };
};

export type GlobalContextType = ReturnType<typeof useGlobal>;

const GlobalContext = createContext<GlobalContextType>(
  {} as unknown as GlobalContextType
);

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const ctx = useGlobal();
  return (
    <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
