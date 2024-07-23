/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButton, PrimaryButton } from "shared/Buttons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOff";

import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiService from "lib/apiService";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await apiService.post("/auth/login", data);
      const { access_token, user } = response.data.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[500px]'>
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Dashboard Sign in
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              type={passwordType}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
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
            className='w-full'
          >
            Sign in
          </PrimaryButton>
        </div>
      </form>
      <p className='text-center text-[#737373]'>Or</p>
      <div className='my-3'>
        <OutlineButton className='w-full'>Sign in with google</OutlineButton>
      </div>
      <div className='text-center'>
        <p className='text-[14px] text-[#737373]'>
          Doesn’t have an account?{" "}
          <Link className='text-[#310839]' to='/auth/sign-up'>
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
