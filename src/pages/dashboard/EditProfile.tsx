import { FC, useState } from "react";
import { TextField } from "@mui/material";
import { PrimaryButton } from "shared/Buttons";
import { ProfileDetails, EditProfileProps } from "types/client";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "lib/apiService";

const EditProfile: FC<EditProfileProps> = ({
  profileDetails,
  handleCloseEditProfile,
}) => {
  const [updatedProfile, setUpdatedProfile] =
    useState<ProfileDetails>(profileDetails);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoading(true);
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const payload = {
      full_name: `${updatedProfile.firstname} ${updatedProfile.lastname}`,
      phone_number: updatedProfile.phoneNumber,
      company: updatedProfile.company,
      job_title: updatedProfile.jobTitle,
      email: updatedProfile.email,
      gender: updatedProfile.gender,
      home_address: updatedProfile.address,
    };

    try {
      const response = await apiService.put("/user/profile", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Profile updated successfully!");
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("upload", file);

      console.log(formData);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      try {
        await apiService.put("/user/profile/photo", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Image uploaded successfully!");
        console.log("Image uploaded successfully");
      } catch (error) {
        toast.error("Error uploading image");
        console.error("Error uploading image", error);
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='w-full md:p-8'>
      <ToastContainer />

      <div className='flex justify-between items-center'>
        <div>
          <h4 className='text-2xl font-medium'>Edit profile</h4>
          <p className='mt-1 text-sm text-gray-700 font-medium'>
            Update your account information
          </p>
        </div>

        <div className='flex justify-end items-center'>
          <IconButton onClick={handleCloseEditProfile}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center my-10'>
        <div className='mb-4 md:mb-0'>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt='user'
              className='w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-4'
            />
          ) : (
            <img
              src={updatedProfile.imageUrl}
              alt='user'
              className='w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-4'
            />
          )}
        </div>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          style={{ display: "none" }}
          id='upload-image'
        />
        <label htmlFor='upload-image'>
          <Button
            variant='outlined'
            style={{ borderRadius: "10px", borderColor: "gray", color: "gray" }}
            component='span'
            startIcon={<EditNoteIcon />}
          >
            Change Picture
          </Button>
        </label>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between gap-3 w-full md:w-3/4 lg:w-2/3 mt-5'>
        <TextField
          placeholder='Enter your first name'
          sx={{ mt: 2 }}
          value={updatedProfile.firstname}
          onChange={handleChange}
          label='First Name'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='firstname'
        />
        <TextField
          placeholder='Enter your last name'
          sx={{ mt: 2 }}
          label='Last Name'
          value={updatedProfile.lastname}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='lastname'
        />
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between gap-3 w-full md:w-3/4 lg:w-2/3 mt-2'>
        <TextField
          placeholder='Enter your company'
          sx={{ mt: 2 }}
          label='Company'
          value={updatedProfile.company}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='company'
        />
        <TextField
          placeholder='Enter your job title'
          sx={{ mt: 2 }}
          label='Job Title'
          value={updatedProfile.jobTitle}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='jobTitle'
        />
      </div>

      <TextField
        placeholder='Enter your email'
        sx={{ mt: 2, width: "100%", md: "75%" }}
        label='Email'
        value={updatedProfile.email}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        name='email'
      />

      <TextField
        placeholder='Enter your phone number'
        sx={{ mt: 2, width: "100%", md: "50%" }}
        label='Phone Number'
        value={updatedProfile.phoneNumber}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        name='phoneNumber'
      />

      <div className='flex flex-col md:flex-row items-center justify-between gap-3 w-full md:w-3/4 lg:w-2/3 mt-2'>
        <TextField
          placeholder='Enter your gender'
          sx={{ mt: 2 }}
          label='Gender'
          value={updatedProfile.gender}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='gender'
        />
        <TextField
          placeholder='Enter your address'
          sx={{ mt: 2 }}
          label='Address'
          value={updatedProfile.address}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='address'
        />
      </div>

      <div className='mt-8 w-full md:w-1/4'>
        <PrimaryButton onClick={handleUpdateProfile} isLoading={isLoading}>
          Update Profile
        </PrimaryButton>
      </div>

      <h4 className='text-2xl font-medium mt-10'>Update password</h4>
      <p className='text-sm text-gray-700 font-medium my-3'>
        Change your account password
      </p>

      <div className='flex flex-col md:flex-row items-center justify-between gap-3 w-full md:w-3/4 lg:w-2/3 mt-2'>
        <TextField
          placeholder='Enter your old password'
          sx={{ mt: 2 }}
          label='Old Password'
          type={showPassword ? "text" : "password"}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder='Enter your new password'
          sx={{ mt: 2 }}
          label='New Password'
          type={showPassword ? "text" : "password"}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className='mt-8 w-full md:w-1/4'>
        <PrimaryButton>Save password</PrimaryButton>
      </div>
    </div>
  );
};

export default EditProfile;
