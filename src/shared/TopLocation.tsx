import { FC } from "react";
import { cn } from "lib/utils";

import emptyAsset from "assets/empty-asset.svg";
import { Box, Typography } from "@mui/material";

interface TopLocation {
  cities: string;
  miles: string;
  percentage: string;
}

interface TopLocationProps {
  className?: string;
  data: TopLocation[];
}

const TopLocation: FC<TopLocationProps> = ({ className, data }) => {
  return (
    <div className={` ${className}`}>
      <h5 className='text-[#1A1A1A] text-[16px] mb-4 font-[500]'>
        Top locations
      </h5>
      <div
        style={{
          border: "1px solid #D8D8D8",
          borderRadius: "2px",
          height: 480,
        }}
      >
        <div className='flex items-center justify-between px-4 pt-6'>
          <h5 className='text-[#959595] w-[50%] text-[13px]'>Cities</h5>
          <h5 className='text-[#959595] w-[50%] text-[13px]'>Miles Covered</h5>
        </div>
        {data?.length !== 0 &&
          data.map(({ cities, miles, percentage }, i, arr) => (
            <div
              className='flex items-center w-full justify-between my-3 py-2 px-4'
              key={i}
            >
              <div className='w-[50%] text-[12px]'>{cities}</div>
              <div className='flex items-center w-[50%]'>
                <p className='text-[12px]'>{miles}</p>
                <p
                  className={cn("text-[11px] ml-2", {
                    "text-[#4CDA1A]": percentage?.includes("+"),
                    "text-[#B3261E]": percentage?.includes("-"),
                  })}
                >
                  {percentage}
                </p>
              </div>
              {arr.length - 1 !== i && (
                <div className='w-[90%] mx-auto'>
                  <hr />
                </div>
              )}
            </div>
          ))}

        {data?.length === 0 && (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            height='100%'
            px={4}
            py={2}
          >
            <img src={emptyAsset} />
            <Typography fontSize='14px'>No locations to view</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TopLocation;
