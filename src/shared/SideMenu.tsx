import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "lib/utils";

import Motion365Logo from "assets/svg/motion-365-logo.svg";
import BillingIcon from "assets/svg/billing-icon.svg";
import CampaignIcon from "assets/svg/campaign-icon.svg";
import DashboardIcon from "assets/svg/dashboard-icon.svg";
import NotificationIcon from "assets/svg/notification-icon.svg";
import ProfileIcon from "assets/svg/profile-icon.svg";
import LogoutIcon from "assets/svg/logout-icon.svg";

const SideMenu: React.FC = () => {
  const SIDE_ITEMS = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: DashboardIcon,
    },
    {
      label: "Campaigns",
      link: "/campaigns",
      icon: CampaignIcon,
    },
    {
      label: "Notifications",
      link: "/notifications",
      icon: NotificationIcon,
    },
    {
      label: "Plans",
      link: "/plans",
      icon: BillingIcon,
    },
    {
      label: "Profile",
      link: "/profile",
      icon: ProfileIcon,
    },
    {
      label: "Logout",
      link: "/logout",
      icon: LogoutIcon,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <div className='flex flex-col justify-between h-screen px-5 overflow-hidden'>
      <div className='flex-grow mt-4 overflow-y-auto'>
        <div className='mt-4 px-3 mb-16'>
          <img src={Motion365Logo} alt='motion-365-logo' />
        </div>
        {SIDE_ITEMS.map(({ label, icon, link }) => (
          <NavLink
            to={link}
            key={label}
            onClick={link === "/logout" ? handleLogout : undefined}
          >
            {({ isActive }) => (
              <div
                className={cn(
                  "text-white flex items-center my-3 mb-5 px-3 py-3 rounded-[9px] active:bg-[#AA00CC]",
                  {
                    "bg-[#AA00CC]": isActive,
                    " hover:bg-gray-900": !isActive,
                  }
                )}
              >
                <img src={icon} alt={label} />
                <p className='ml-4 text-[14px]'>{label}</p>
              </div>
            )}
          </NavLink>
        ))}
      </div>

      <div className='text-center text-white rounded-md py-2 mb-6 bg-[#310839]'>
        <p>Motion365</p>
      </div>
    </div>
  );
};

export default SideMenu;
