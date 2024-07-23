import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import apiService from "lib/apiService";

interface UserProfile {
  email: string;
  full_name: string;
}

const ProtectedRoute: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        const response = await apiService.get<UserProfile>("/user/profile");
        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    verifyUser();
  }, [token]);

  if (isAuth === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuth === false) {
    return <Navigate to='/auth/sign-in' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
