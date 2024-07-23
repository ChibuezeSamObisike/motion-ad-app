import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import emptyAsset from "assets/empty-asset.svg";

interface MonthlyData {
  month: string;
  views: number;
  locations: number;
}

interface DashboardAnalyticsProps {
  data: MonthlyData[];
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ data }) => {
  const [sortBy, setSortBy] = useState("monthly");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className='py-7 px-1 bg-[#f5f5f5]'>
      <div className='flex justify-between items-center'>
        <div className='flex '>
          <h6 className='text-[16px] text-[#1A1A1A] font-bold text-[400] mr-6'>
            Analytics
          </h6>
          <div className='flex'>
            <div className='flex items-center ml-2'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='14' height='14' fill='#AA00CC' />
              </svg>
              <h6 className='text-[16px] text-[#1A1A1A] text-sm text-gray-400 ml-1'>
                Views
              </h6>
            </div>
            <div className='flex items-center ml-2'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='14' height='14' fill='#006E88' />
              </svg>
              <h6 className='text-[16px] text-[#1A1A1A] text-sm text-gray-400 ml-1'>
                Locations
              </h6>
            </div>
          </div>
        </div>
        <div className='ml-4'>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className='block appearance-none bg-transparent text-gray-500 text-sm border border-gray-200 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='monthly'>Monthly</option>
            <option value='daily'>Daily</option>
            <option value='yearly'>Yearly</option>
          </select>
        </div>
      </div>

      <div className='w-full flex items-center justify-center mt-6'>
        {data?.length !== 0 && (
          <ResponsiveContainer height={300} width={800}>
            <AreaChart height={300} width={800} data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type='linear'
                dataKey='views'
                stackId='1'
                stroke='#AA00CC'
                fill='#F3E5F5'
              />
              <Area
                type='linear'
                dataKey='locations'
                stackId='1'
                stroke='#006E88'
                fill='#E0F7FA'
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {data?.length === 0 && (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            px={4}
            py={6}
            width='100%'
            border='1px solid #D8D8D8'
            height='100%'
          >
            <img src={emptyAsset} />
            <Typography fontSize='14px'>Analytics are yet to start</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
