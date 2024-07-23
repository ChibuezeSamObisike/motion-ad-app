/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
import { ResponseError } from "../lib/utils";
import * as userLocalStorage from "./userLocalStore";
import apiService from "lib/apiService";

async function getUser(): Promise<any> {
  const storedUser = userLocalStorage.getUser();
  if (!storedUser) return null;

  const response = await apiService.get(`/profile`);

  if (!response) {
    throw new ResponseError("Failed on get user request", response);
  }

  return response;
}

export interface User {
  email: string;
  id: number;
}

interface IUseUser {
  user: User | null;
  isAuth: boolean;
}

export function useUser(): IUseUser {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      getUser()
        .then((userData: SetStateAction<User | null>) => {
          setUser(userData);
          setIsAuth(true);
        })
        .catch(() => {
          setUser(null);
          setIsAuth(false);
          userLocalStorage.removeUser();
        });
    } else {
      setUser(null);
      setIsAuth(false);
    }
  }, []);

  return { user, isAuth };
}
