import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    window.location.href = "/auth/sign-in";
  }, []);
  return null;
};

export default Logout;
