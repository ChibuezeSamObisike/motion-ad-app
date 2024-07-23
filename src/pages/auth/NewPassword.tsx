/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { PrimaryButton } from "shared/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOff";
import apiService from "lib/apiService";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await apiService.put(
        "/auth/reset-password",
        { password: data.password, confirm_password: data.confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password updated successfully!");
      navigate("/auth/password-reset");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[100%]'>
      <ToastContainer />
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Create a New Password
      </h5>
      <p className='text-[16px] text-[#92929D]'>
        Create a new password to access your admin dashboard.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Input your password here'
              sx={{ mt: 3, width: "80%" }}
              label='Password'
              InputLabelProps={{ shrink: true }}
              type={passwordType}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        setPasswordType((prevType) =>
                          prevType === "text" ? "password" : "text"
                        )
                      }
                    >
                      {passwordType === "text" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Confirm your password here'
              sx={{ mt: 3, width: "80%" }}
              label='Confirm Password'
              InputLabelProps={{ shrink: true }}
              type={passwordType}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        setPasswordType((prevType) =>
                          prevType === "text" ? "password" : "text"
                        )
                      }
                    >
                      {passwordType === "text" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <div className='w-[50%] mt-5'>
          <PrimaryButton isLoading={isLoading} type='submit'>
            Save password
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
