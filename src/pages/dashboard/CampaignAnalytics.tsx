"use client";
import { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import AppPieChart from "shared/AppPieChart";
import { OutlineButton, PrimaryButton } from "shared/Buttons";
import LeaveFeedbackModal from "shared/FeedBackModal";
import GrowthIcon from "assets/svg/growth-img.svg";
import PlayBackSummary from "shared/PlayBackSummary";
import AudienceIcon from "assets/svg/audience.svg";

import { fetchCampaignReport } from "lib/apiService";
import { CampaignReportData } from "types/api";
import { Box, Typography } from "@mui/material";
import { RevolvingDot } from "react-loader-spinner";

import emptyAsset from "assets/empty-asset.svg";

export interface PlaybackSummary {
  total_playback: number;
  month: string;
}

interface TopLocation {
  location: string;
  views: number;
}

interface ViewByCity {
  city: string;
  views: number;
  total_minutes_played: number;
}

export interface ApiResponse {
  data: CampaignReportData;
  message: string;
  status: boolean;
}

const CampaignAnalytics: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CampaignReportData | null>(null);
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const reportData = await fetchCampaignReport(id);
          setData(reportData);
          console.log("report data", reportData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!data) {
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

  return (
    <div className='w-full mt-3 py-4 md:py-8 lg:py-10'>
      <div className='flex flex-col w-full md:flex-row items-center justify-between'>
        <h4 className='text-xl md:text-2xl text-left font-semibold'>
          Campaign Analytics
        </h4>
        <div className='flex items-center flex-col md:flex-row w-full mt-4 md:mt-0'>
          <OutlineButton
            className='px-4 md:mr-2 w-full'
            onClick={handleOpenModal}
          >
            Leave Feedback
          </OutlineButton>
          <PrimaryButton className='px-4 mt-2 md:mt-0 md:ml-2'>
            Download Report
          </PrimaryButton>
        </div>
      </div>
      <div className='mt-8 flex flex-col lg:flex-row'>
        <div className='w-full lg:w-2/3'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <AnalyticsCard
              title='Total Miles Reached'
              value={data.total_miles_reached.toLocaleString()}
            />
            <AnalyticsCard
              title='Total Audience'
              value={data.total_minutes_played.toLocaleString()}
              imgSrc={AudienceIcon}
            />
          </div>
          <PlayBackSummary data={data.playback_summary} className='mt-8' />
        </div>
        <div className='w-full lg:w-1/3 lg:ml-4 mt-8 lg:mt-0'>
          <TopLocations data={data?.top_location || []} />
          <ViewsByCity data={data.views_by_city} className='mt-8' />
        </div>
      </div>
      {isModalOpen && <LeaveFeedbackModal onClose={handleCloseModal} />}
    </div>
  );
};

// Define types for the components' props
interface IProps {
  title: string;
  value: string;
  imgSrc?: string;
}

const AnalyticsCard: FC<IProps> = ({ title, value, imgSrc }) => {
  return (
    <div className='flex w-full items-center justify-between p-4 py-6 rounded-lg bg-white shadow-sm'>
      <div>
        <h4 className='text-lg font-medium'>{title}</h4>
        <p className='text-3xl font-light'>{value}</p>
      </div>
      {imgSrc && <img src={imgSrc} alt='' className='h-12 w-12' />}
    </div>
  );
};

interface TopLocationsProps {
  data: TopLocation[];
}

const TopLocations: FC<TopLocationsProps> = ({ data }) => {
  return (
    <div className='bg-white rounded-lg p-5 shadow-sm'>
      <h1 className='text-lg font-medium'>Top Locations</h1>
      <p className='text-sm text-gray-600'>Your top locations</p>
      {data?.length > 0 && (
        <div className='mt-4'>
          <AppPieChart title='' data={data} />
        </div>
      )}
      {data?.length === 0 && (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          px={4}
          py={2}
        >
          <img src={emptyAsset} />
          <Typography fontSize='14px'>No locations to view</Typography>
        </Box>
      )}
    </div>
  );
};

interface ViewsByCityProps {
  data: ViewByCity[];
  className?: string;
}

const ViewsByCity: FC<ViewsByCityProps> = ({ data, className }) => {
  return (
    <div className={`bg-white rounded-lg mt-10 shadow-sm ${className}`}>
      <div className='p-5'>
        <h5 className='text-base font-medium'>Views by City</h5>
        <p className='text-sm text-gray-600'>Your views</p>
      </div>
      {data?.length > 0 &&
        data.map((cityData, index) => (
          <VCCard key={index} cityData={cityData} />
        ))}
      {data?.length === 0 && (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          px={4}
          py={2}
        >
          <img src={emptyAsset} />
          <Typography fontSize='14px'>No views by city yet</Typography>
        </Box>
      )}
    </div>
  );
};

interface VCCardProps {
  cityData: ViewByCity;
}

const VCCard: FC<VCCardProps> = ({ cityData }) => {
  return (
    <div className='flex items-center justify-between p-5 py-4 border-t border-gray-200'>
      <div>
        <h5 className='text-sm font-medium text-gray-800'>{cityData.city}</h5>
        <p className='text-xs text-gray-500'>Views: {cityData.views}</p>
      </div>
      <div className='flex items-center'>
        <img src={GrowthIcon} className='mr-2' />
        <div>
          <h5 className='text-sm font-medium text-gray-800'>
            {(cityData.total_minutes_played / 60).toLocaleString()} mins
          </h5>
          <p className='text-xs text-gray-500'>Total Minutes Played</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
