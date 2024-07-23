/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { PrimaryButton } from "shared/Buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import apiService from "lib/apiService";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await apiService.post("/auth/forgot-password/", { email: data.email });
      toast.success(
        "Instructions to reset your password have been sent to your email."
      );
      navigate("/auth/new-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[90%]'>
      <Box
        onClick={() => navigate(-1)}
        sx={{ cursor: "pointer" }}
        display='flex'
        mt={-10}
        mb={5}
        alignItems='center'
      >
        <Box
          display='flex'
          border='1px solid #E1E1E1'
          alignItems='center'
          justifyContent='center'
          borderRadius='8px'
          p={1}
          mr={2}
        >
          <ArrowBackIosNewIcon sx={{ color: "#9A9AB0" }} />
        </Box>
        <Typography color='#11142D' fontSize='22px'>
          Back
        </Typography>
      </Box>
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Forgot Password
      </h5>
      <p className='text-[16px] text-[#92929D]'>
        Enter the email address you used when you joined and we’ll send you
        instructions to reset your password.
        <br /> <br /> For security reasons, we do NOT store your password. So
        rest assured that we will never send your password via email.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Input your email here'
              sx={{ mt: 3, width: "80%" }}
              label='Email'
              InputLabelProps={{ shrink: true }}
              required
              type='email'
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <div className='w-[50%] mt-5'>
          <PrimaryButton isLoading={isLoading} type='submit'>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
