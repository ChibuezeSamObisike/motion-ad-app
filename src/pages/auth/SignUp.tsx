/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButton, PrimaryButton } from "shared/Buttons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOff";
import apiService from "lib/apiService";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await apiService.post("/auth/register/advertiser", data);
      console.log("Response", response);
      toast.success("Account created successfully!");
      navigate("/auth/about-company");
      localStorage.setItem("userDetails", JSON.stringify(response.data.data));
    } catch (error: any) {
      console.log("On submit error", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[500px]'>
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Create an account
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='first_name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Input your first name here'
              sx={{ mt: 2 }}
              label='First Name'
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          )}
        />
        <Controller
          name='last_name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Input your last name here'
              sx={{ mt: 2 }}
              label='Last Name'
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Input your email here'
              sx={{ mt: 2 }}
              label='Email'
              InputLabelProps={{ shrink: true }}
              type='email'
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Input your password here'
              sx={{ mt: 3 }}
              label='Password'
              InputLabelProps={{ shrink: true }}
              fullWidth
              type={passwordType}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        setPasswordType(
                          passwordType === "text" ? "password" : "text"
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
          name='confirm_password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Confirm your password here'
              sx={{ mt: 3 }}
              label='Confirm Password'
              InputLabelProps={{ shrink: true }}
              fullWidth
              type={passwordType}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        setPasswordType(
                          passwordType === "text" ? "password" : "text"
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
        <div className='flex items-end text-right w-full mt-4 mb-5 justify-end'>
          <Link
            className='text-[14px] text-[#737373]'
            to='/auth/forgot-password'
          >
            Forgot password?
          </Link>
        </div>

        <div className='my-3'>
          <PrimaryButton
            type='submit'
            isLoading={isLoading}
            disabled={isLoading}
          >
            Sign Up
          </PrimaryButton>
        </div>
      </form>

      <p className='text-center text-[#737373]'>Or</p>
      <div className='my-3'>
        <OutlineButton className='w-full'>Sign in with Google</OutlineButton>
      </div>

      <div className='text-center'>
        <p className='text-[14px] text-[#737373]'>
          Already have an account?{" "}
          <Link className='text-[#310839]' to='/auth/sign-in'>
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
