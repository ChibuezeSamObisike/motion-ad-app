/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { PrimaryButton } from "shared/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Step1 from "assets/Step1.png";
import apiService from "lib/apiService";

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userId = userDetails.id;

  // const schema = yup.object().shape({
  //   company_name: yup.string().required("Company name is required"),
  //   company_description: yup
  //     .string()
  //     .required("Company description is required"),
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiService.put(
        `/auth/register/advertiser/complete/${userId}`,
        {
          company_name: companyName,
          company_description: companyDescription,
        }
      );
      console.log(response);
      toast.success("Company details saved successfully!");
      navigate("/auth/completed");
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while saving company details"
        );
      }
    }
    setIsLoading(false);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleCompanyDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyDescription(e.target.value);
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[85%]'>
      <ToastContainer />
      <img src={Step1} className='w-[85px] mb-4' alt='Step 1' />
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Tell us about your company
      </h5>
      <p className='text-[16px] font-[500]'>
        Thousands of companies like yours are managing their projects and teams
        in an easy way.
      </p>

      <form onSubmit={handleSubmit}>
        <div className='w-[80%]'>
          <TextField
            placeholder='Input your company name'
            sx={{ mt: 4 }}
            fullWidth
            label='Your Company Name'
            InputLabelProps={{
              shrink: true,
            }}
            value={companyName}
            onChange={handleCompanyNameChange}
          />
          <TextField
            placeholder='Tell us about your company'
            sx={{ mt: 4 }}
            fullWidth
            multiline
            label='Your Company Description'
            InputLabelProps={{
              shrink: true,
            }}
            value={companyDescription}
            onChange={handleCompanyDescriptionChange}
          />
        </div>

        <div className='my-3 mt-6 w-[20%]'>
          <PrimaryButton isLoading={isLoading} type='submit'>
            Next
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default Company;
