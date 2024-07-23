import React, { PropsWithChildren, Suspense, useState } from "react";

import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import Navbar from "shared/Navbar";
import SideMenu from "shared/SideMenu";
import { RevolvingDot } from "react-loader-spinner";

interface IProps {
  title: string | undefined;
}

const DashboardLayout: React.FC<PropsWithChildren<IProps>> = ({
  children,
  title,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className='flex min-h-screen overflow-x-hidden'>
      <div className='hidden lg:block lg:w-[20%] bg-black fixed min-h-screen'>
        <SideMenu />
      </div>
      <div className='lg:ml-[20%] w-full overflow-x-hidden'>
        <div className='lg:hidden'>
          <AppBar
            sx={{ bgcolor: "#000", borderBottom: "0.5px solid grey" }}
            elevation={0}
            position='fixed'
          >
            <Toolbar
              sx={{ bgcolor: "#f5f5f5 !important" }}
              className='flex justify-start'
            >
              <IconButton
                edge='start'
                sx={{ color: "#000" }}
                aria-label='menu'
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Navbar title={title} />
            </Toolbar>
          </AppBar>
        </div>
        <Drawer
          anchor='left'
          open={drawerOpen}
          onClose={toggleDrawer}
          className='lg:hidden'
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className='w-64 bg-black h-full'
          >
            <IconButton onClick={toggleDrawer} className='text-white m-2'>
              <CloseIcon />
            </IconButton>
            <SideMenu />
          </motion.div>
        </Drawer>
        <div className='lg:sticky lg:top-0 lg:bg-white lg:z-10'>
          <div className='hidden lg:block border-b border-gray-300 lg:w-full'>
            <Navbar title={title} />
          </div>
        </div>
        <div className='px-10 w-full flex flex-col items-center justify-between pt-[64px] lg:pt-0 py-4 bg-[#f5f5f5] h-full overflow-x-auto'>
          <Suspense
            fallback={
              <Box
                alignItems='center'
                height='100vh'
                justifyContent='center'
                display='flex'
              >
                <RevolvingDot color='#aa00cc' width='10px' />
              </Box>
            }
          >
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
