import { FC, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import SignInImg from "../assets/sign-in.jpg";

const AuthLayout: FC = () => {
  const location = useLocation();
  const [flip, setFlip] = useState<boolean>(false);

  const [routeListen, setRouteListen] = useState<string>("");

  useEffect(() => {
    setRouteListen(location.pathname.replace("/auth/", ""));

    return () => setRouteListen("");
  }, [location.pathname]);

  const pathsToCheck: string[] = useMemo(
    () => [
      "forgot-password",
      "new-password",
      "reset-successful",
      "password-reset",
    ],
    []
  );

  const flipPaths = location.pathname.replace("/auth/", "");
  useEffect(() => {
    pathsToCheck.forEach((path) => {
      if (path.includes(flipPaths)) {
        setFlip(true);
      }
    });

    return () => setFlip(false);
  }, [flipPaths, location.pathname, pathsToCheck]);

  return (
    <div
      className={cn("w-[100vw] max-h-[100vh] fixed flex flex-col lg:flex-row", {
        "lg:flex-row-reverse": flip,
      })}
    >
      <div className='hidden lg:block lg:w-[50%]'>
        <img
          src={SignInImg}
          alt='sign-in-img'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='flex flex-col items-center justify-center px-2 bg-[#f5f5f5] w-full lg:w-[50%] h-[100vh]'>
        <div className='block lg:hidden text-center text-3xl font-bold mb-4'>
          {/**Logo */}
        </div>
        <AnimatePresence>
          {routeListen && (
            <motion.div
              key='auth-route'
              initial={{ x: 300, opacity: 0, y: 10000 }}
              animate={{ x: 0, opacity: 1, y: 0 }}
              exit={{ x: -300, opacity: 0, y: -100 }}
              transition={{ ease: "easeInOut", duration: 1 }}
              className='w-full px-4 flex flex-col items-center justify-center lg:mx-0 mx-4'
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthLayout;
