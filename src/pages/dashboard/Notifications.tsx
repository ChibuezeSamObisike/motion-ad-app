import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TrashIcon from "assets/svg/trash.svg";
import MessageIcon from "assets/svg/message-icon.svg";
import { fetchNotifications, markNotificationAsRead } from "lib/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import emptyAsset from "assets/empty-asset.svg";

interface Notification {
  id: number;
  title: string;
  message: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchNotificationsData();
  }, []);

  const fetchNotificationsData = async () => {
    try {
      setLoading(true);
      const data = await fetchNotifications();
      console.log("Fetched notifications:", data);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Error fetching notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markNotificationAsRead();
      fetchNotificationsData();
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      toast.error("Error marking notifications as read");
    }
  };

  return (
    <div className='w-full mt-5'>
      <div className='flex items-center justify-between mt-4'>
        <h4 className='text-[14px] opacity-[50%]'>
          You've got {notifications.length} unread notifications
        </h4>
        <button
          className='text-[#310839] bg-[#ebe6eb] rounded-[8px] py-2 px-4 text-[14px]'
          onClick={handleMarkAllAsRead}
        >
          Mark all as read
        </button>
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <CircularProgress />
        </div>
      ) : notifications.length === 0 ? (
        <div className='flex flex-col mt-[20vh] justify-center items-center'>
          <img src={emptyAsset} />
          <h4 className='text-[14px] opacity-[50%]'>
            Oops, you have no notifications
          </h4>
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      )}
      <ToastContainer />
    </div>
  );
};

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  return (
    <div
      style={{ border: "1px solid #EAEAEA", borderRadius: "8px" }}
      className='my-4 p-3 flex items-center justify-between'
    >
      <div className='flex'>
        <div className='size-[52px] flex items-center justify-center bg-[#ebe6eb] rounded-[50%] mr-6'>
          <img src={MessageIcon} alt='Message Icon' />
        </div>
        <div>
          <h4 className='font-[500]'>{notification.title}</h4>
          <p className='text-[14px] opacity-[50%]'>{notification.message}</p>
        </div>
      </div>
      <div className='cursor-pointer'>
        <img src={TrashIcon} alt='Trash Icon' />
      </div>
    </div>
  );
};

export default Notifications;
