/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { PrimaryButton } from "shared/Buttons";
import EditProfile from "./EditProfile";

import { Box } from "@mui/material";
import { RevolvingDot } from "react-loader-spinner";
import apiService from "lib/apiService";

const Profile: FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      try {
        const response = await apiService.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data.data;
        setUserDetails({
          firstname: data.full_name.split(" ")[0],
          lastname: data.full_name.split(" ")[1],
          fullname: data.full_name,
          email: data.email,
          phoneNumber: data.phone_number,
          registeredDate: formatDate(data.created_at),
          imageUrl: data.profile_photo_url || "default_image_url_here",
          company: "DataNexi",
          jobTitle: "Junior Developer",
          representativeName: "Eureka Adams",
          projectCategory: "Healthcare, Real Estate, PHCN",
          dateJoined: new Date(data.created_at).toLocaleDateString(),
          address: data.home_address,
          gender: data.gender,
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  if (!userDetails) {
    return (
      <Box
        alignItems='center'
        height='100vh'
        justifyContent='center'
        display='flex'
      >
        <RevolvingDot color='#aa00cc' width='10px' />
      </Box>
    );
  }

  const handleCloseEditProfile = () => {
    setIsEditMode(false);
  };

  return (
    <div className='py-4 md:py-8 w-full'>
      {isEditMode ? null : (
        <>
          <h4 className='text-2xl font-medium mt-4'>Overview</h4>
          <div className='flex flex-col md:flex-row items-center justify-between border-t border-b border-gray-300 py-8 mt-5'>
            <div className='flex flex-col md:flex-row items-center w-2/3'>
              <div className='flex flex-col md:flex-row items-center'>
                <img
                  src={userDetails.imageUrl}
                  alt='user'
                  className='w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-5'
                />
                <div className='mr-1 w-full text-center md:text-left'>
                  <h5 className='text-lg font-medium'>
                    {userDetails.fullname}
                  </h5>
                  <p className='text-sm font-light'>{userDetails.email}</p>
                </div>
              </div>

              <p className='text-[#310839] w-fit ml-4 text-center bg-[#e6e3ec] px-3 py-1 font-light rounded mt-2 md:mt-0'>
                Registered {userDetails.registeredDate}
              </p>
            </div>

            <div className='w-full md:w-auto mt-4 md:mt-0 text-center md:text-right'>
              <PrimaryButton
                className='px-8 text-[14px]'
                onClick={handleEditProfile}
              >
                Edit Profile
              </PrimaryButton>
            </div>
          </div>
        </>
      )}

      <div className='mt-4'>
        {isEditMode ? (
          <EditProfile
            profileDetails={userDetails}
            handleCloseEditProfile={handleCloseEditProfile}
          />
        ) : (
          <div className='grid grid-cols-1 gap-4 mt-5'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <b className='w-full md:w-1/3'>Company</b>
              <p className='w-full md:w-2/3'>{userDetails.company}</p>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <b className='w-full md:w-1/3'>Job title</b>
              <p className='w-full md:w-2/3'>{userDetails.jobTitle}</p>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <b className='w-full md:w-1/3'>
                <p>Phone</p>
              </b>
              <p className='w-full md:w-2/3'>
                {userDetails.phoneNumber || "--"}
              </p>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <b className='w-full md:w-1/3'>Date Joined</b>
              <p className='w-full md:w-2/3'>
                {userDetails.dateJoined || "--"}
              </p>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <b className='w-full md:w-1/3'>Address</b>
              <p className='w-full md:w-2/3'>{userDetails.address || "--"}</p>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <b className='w-full md:w-1/3'>Gender</b>
              <p className='w-full md:w-2/3'>{userDetails.gender || "--"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
