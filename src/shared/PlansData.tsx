import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { State } from "country-state-city";
import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  CircularProgress,
} from "@mui/material";
import { OutlineButton, PrimaryButton } from "./Buttons";
import { fetchPlans } from "lib/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Plan {
  id: string;
  name: string;
  sub_plan: {
    duration: string;
    cost: number;
    id: string;
  }[];
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PlansData: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [planData, setPlanData] = useState<Plan[]>([]);
  const [selectedState, setSelectedState] = useState<string>("Lagos");
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPlans()
      .then((response) => {
        const plans = response.data;
        setPlanData(plans);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching plan data:");
        console.error("Error fetching plan data:", error);
      });

    const nigeriaStates = State.getStatesOfCountry("NG");
    const mappedStates = nigeriaStates.map((state) => ({
      value: state.name,
      label: state.name,
    }));
    setStates(mappedStates);
  }, []);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const startCampaign = () => {
    if (selectedPlanId) {
      localStorage.setItem("selectedPlanId", selectedPlanId);
      navigate("/campaigns/new");
    }
  };

  return (
    <>
      <ToastContainer />
      <h4 className='text-[22px] mt-8 font-[400] text-[#1A1A1A]'>
        Choose a Pricing Plan
      </h4>
      <p className='text-[16px] font-[400] mt-2 text-[#00000] opacity-50'>
        Thousands company like yours are manage their project and team in easy
        way
      </p>

      <div className='flex items-center justify-between my-8 w-full flex-col md:flex-row'>
        <h5 className='md:mr-4 mb-4 md:mb-0 w-full'>
          Preferred Campaign Location
        </h5>
        <FormControl className='w-full flex justify-end md:items-end'>
          <MuiSelect
            id='state'
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}
            sx={{ height: "32px", width: "200px" }}
          >
            {states.map((state, index) => (
              <MenuItem key={index} value={state.value}>
                {state.label}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      </div>

      {loading ? (
        <div className='flex justify-center mt-4'>
          <CircularProgress />
        </div>
      ) : (
        <div className='relative flex mt-4 flex-col w-full gap-y-4 md:gap-x-4 md:gap-y-0'>
          {planData.map((plan) => (
            <div
              key={plan.id}
              className={`w-full border-b rounded-xl border-gray-300 flex flex-col md:flex-row justify-center items-center bg-purple-900 md:gap-y-4`}
            >
              <div className='w-full text-white h-full flex flex-col items-center justify-center p-4 md:p-6'>
                <svg
                  width='43'
                  height='31'
                  viewBox='0 0 43 31'
                  className='mb-2'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M41.5662 7.11266H37.993C37.7956 7.1151 37.6063 7.19128 37.4623 7.32623C36.3211 5.50457 35.1402 4.04629 34.2238 3.12988C31.0363 -0.0576172 11.9113 -0.0576172 8.72377 3.12988C7.81055 4.0447 6.63595 5.49341 5.5012 7.30232C5.36449 7.18455 5.19075 7.11855 5.01033 7.11585H1.43555C0.997266 7.11585 0.638672 7.47604 0.638672 7.91273V9.52241C0.638672 9.9591 0.989297 10.383 1.41961 10.4675L3.58711 10.8819C1.71605 15.0543 0.613172 20.2468 2.34717 25.4488V28.5359C2.34717 29.4172 2.5703 30.1296 2.84602 30.1296H6.9292C7.20492 30.1296 7.42805 29.4172 7.42805 28.5359V26.0114C11.0905 26.362 16.2734 26.7445 21.4722 26.7445C26.6232 26.7445 31.8634 26.3683 35.5195 26.0209V28.5359C35.5195 29.4172 35.7426 30.1296 36.0167 30.1296H40.0999C40.374 30.1296 40.5972 29.4172 40.5972 28.5359L40.594 25.4472C42.3264 20.2515 41.2267 15.0623 39.3588 10.8899L41.5773 10.4675C41.7939 10.4183 41.988 10.2987 42.1293 10.1274C42.2706 9.95607 42.3511 9.74276 42.3583 9.52082V7.91113C42.3587 7.80677 42.3385 7.70335 42.2989 7.60679C42.2593 7.51023 42.2011 7.42243 42.1275 7.34841C42.0539 7.2744 41.9665 7.21561 41.8702 7.17543C41.7738 7.13525 41.6705 7.11447 41.5662 7.11426V7.11266ZM7.32764 20.0651C6.57833 20.0402 5.86804 19.725 5.34679 19.1861C4.82553 18.6473 4.53413 17.9269 4.53413 17.1772C4.53413 16.4275 4.82553 15.7071 5.34679 15.1682C5.86804 14.6294 6.57833 14.3142 7.32764 14.2893C8.07694 14.3144 8.78715 14.6298 9.30826 15.1688C9.82936 15.7078 10.1206 16.4282 10.1204 17.178C10.1202 17.9277 9.82855 18.648 9.30715 19.1867C8.78574 19.7254 8.07695 20.0404 7.32764 20.0651ZM4.89877 11.7935C6.42877 8.29204 8.55961 5.55079 9.85055 4.25666C10.7813 3.32432 15.1737 2.33301 21.4722 2.33301C27.7723 2.33301 32.163 3.32591 33.0954 4.25826C34.3863 5.5492 36.5156 8.29045 38.0456 11.7935C34.6477 12.1696 28.0289 11.2994 21.4738 11.2994C14.9187 11.2994 8.29983 12.1696 4.89877 11.7935ZM35.6167 20.0651C34.8674 20.0402 34.1571 19.725 33.6358 19.1861C33.1146 18.6473 32.8232 17.9269 32.8232 17.1772C32.8232 16.4275 33.1146 15.7071 33.6358 15.1682C34.1571 14.6294 34.8674 14.3142 35.6167 14.2893C36.366 14.3144 37.0762 14.6298 37.5973 15.1688C38.1184 15.7078 38.4096 16.4282 38.4094 17.178C38.4092 17.9277 38.1176 18.648 37.5962 19.1867C37.0748 19.7254 36.366 20.0404 35.6167 20.0651Z'
                    fill='#AA00CC'
                  />
                </svg>

                <h2 className='text-xl capitalize'>{plan.name}</h2>
                <h2 className='mb-6 text-xl'>Cars</h2>
              </div>
              {plan.sub_plan.map((subPlan) => (
                <div
                  key={subPlan.id}
                  className={`w-full py-5 flex flex-col items-center ${
                    subPlan.duration === "monthly" ? "bg-pink-100" : "bg-white"
                  }`}
                >
                  <h3 className='mb-6 text-xl capitalize'>
                    {subPlan.duration}
                  </h3>
                  <div className='w-full flex items-center text-2xl justify-center'>
                    ₦{formatPrice(subPlan.cost)}
                  </div>
                  <div className='w-full py-4 flex items-center justify-center'>
                    <OutlineButton
                      onClick={() => handlePlanSelect(subPlan.id)}
                      className={`shadow-sm w-full px-8 ${
                        selectedPlanId === subPlan.id
                          ? "bg-blue-500 text-white "
                          : ""
                      }`}
                    >
                      {selectedPlanId === subPlan.id ? "Selected" : "Select"}
                    </OutlineButton>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedPlanId && (
        <div className='mt-4 flex justify-end'>
          <PrimaryButton className='px-5 text-[14px]' onClick={startCampaign}>
            Start Campaign
          </PrimaryButton>
        </div>
      )}
    </>
  );
};

export default PlansData;
