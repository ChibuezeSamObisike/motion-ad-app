import React, { useEffect, useState } from 'react';

import NotificationIcon from 'assets/svg/dashboard-notification-icon.svg';
import { Link } from 'react-router-dom';
import apiService from 'lib/apiService';

interface UserProfile {
  full_name: string;
  profile_photo_url: string;
}

const Navbar: React.FC<{ title: string | undefined }> = ({ title }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const getUserProfile = async () => {
      if (!accessToken) {
        console.error('Access token is missing');
        return;
      }

      try {
        const response = await apiService.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    getUserProfile();
  }, [accessToken]);

  const getFirstName = (fullName: string) => {
    return fullName ? fullName.split(' ')[0] : 'User';
  };

  return (
    <div
      style={{ width: '100%', height: '80px' }}
      className='flex justify-between items-center py-2 px-6  lg:bg-[#f5f5f5]'
    >
      <h6 className='text-[20px] md:text-[22px] lg:text-[#1A1A1A] text-black font-[400] capitalize'>
        {title}
      </h6>

      <div className='flex items-center'>
        <div className='flex mr-4 ml-7 lg:ml-0 border border-gray-300 bg-white rounded-full p-2 px-4'>
          {profile && (
            <img
              src={profile.profile_photo_url}
              className='rounded-full'
              alt='User'
              style={{ width: '20px', height: '20px' }}
            />
          )}
          <span className='text-black ml-2'>
            {profile ? getFirstName(profile.full_name) : 'Loading...'}
          </span>
        </div>
        <Link to={'/notifications'}>
          <img
            src={NotificationIcon}
            alt='Notifications'
            className='ml-4'
            style={{ width: '30px', height: '30px' }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
