import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { PrimaryButton } from "shared/Buttons";
import PlansData from "shared/PlansData";
import { Link } from "react-router-dom";
import { formatToNaira } from "utils/currency";
import apiService from "lib/apiService";

interface Campaign {
  id: string;
  name: string;
  description: string;
  created_by: string;
  sub_plan_id: string;
  sub_plan: {
    duration: string;
    cost: number;
    id: string;
    campaign_plan_id: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const Campaigns: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignsPerPage] = useState(4);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [showPlansData, setShowPlansData] = useState<boolean>(false);

  const fetchCampaigns = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await apiService.get("/campaign", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          per_page: campaignsPerPage,
        },
      });

      const data = response.data.data.item;
      const total_pages = response.data.data.total_pages;

      setFilteredCampaigns(data);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, campaignsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredAndSearchedCampaigns = filteredCampaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilter === "all" ||
        campaign.status.toLowerCase() === selectedFilter.toLowerCase())
  );

  const currentCampaigns = filteredAndSearchedCampaigns.slice(
    (currentPage - 1) * campaignsPerPage,
    currentPage * campaignsPerPage
  );

  return (
    <div className='mt-1 w-full'>
      {showPlansData ? (
        <PlansData />
      ) : (
        <>
          <div className='flex flex-col lg:flex-row justify-between items-center gap-4 py-4'>
            <div className='flex flex-col md:flex-row w-full items-center gap-4'>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 20,
                    height: 40,
                    outline: "none",
                    background: "white",
                    paddingX: "1rem",
                    border: 0,
                    mt: { xs: 5, md: 0 },
                    width: { xs: "100%", md: "auto" },

                    "& > input": {
                      padding: "0px",
                      width: { xs: "100%", md: "auto" },
                    },
                  },
                }}
                value={searchQuery}
                onChange={handleSearch}
                placeholder='Search campaigns'
                className='rounded-full w-full md:w-auto md:px-3'
              />
              <Button
                variant='contained'
                style={{ borderRadius: "20px" }}
                startIcon={<AddIcon />}
                className='bg-[#AA00CC] w-full md:w-auto'
                onClick={() => setShowPlansData(true)}
              >
                Create new campaign
              </Button>
            </div>

            <Select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as string)}
              displayEmpty
              variant='standard'
              disableUnderline
              // inputProps={{ "aria-label": "Without label" }}
              sx={{
                height: "42px",
                width: { xs: "100%", md: "200px" },
                background: "white",
                borderRadius: "12px",
              }}
              className='shadow-md px-3'
            >
              <MenuItem value='newest'>Newest</MenuItem>
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='ongoing'>Ongoing</MenuItem>
              <MenuItem value='in-review'>In Review</MenuItem>
              <MenuItem value='expired'>Expired</MenuItem>
            </Select>
          </div>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : filteredAndSearchedCampaigns.length === 0 ? (
            <div className='flex justify-center items-center h-screen'>
              <div
                className='bg-white p-8 rounded-md'
                style={{ width: "500px", height: "250px" }}
              >
                <div className='mt-10 text-center'>
                  <p className='text-center text-gray-900 font-semibold mb-4'>
                    No campaigns found
                  </p>
                  <PrimaryButton
                    className='px-4 mt-5'
                    onClick={() => setShowPlansData(true)}
                  >
                    Create new campaign
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {currentCampaigns.map((campaign, index) => (
                <CampaignCard key={index} campaign={campaign} />
              ))}

              {totalPages > 1 && (
                <div className='flex justify-between items-center px-4 py-2'>
                  <div className='text-gray-700 text-sm'>
                    Showing {(currentPage - 1) * campaignsPerPage + 1} to{" "}
                    {Math.min(
                      currentPage * campaignsPerPage,
                      filteredAndSearchedCampaigns.length
                    )}{" "}
                    of {filteredAndSearchedCampaigns.length} campaigns
                  </div>

                  <div className='flex justify-center items-center gap-2'>
                    <svg
                      width='30'
                      height='30'
                      onClick={prevPage}
                      className='cursor-pointer'
                      viewBox='0 0 30 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='0.5'
                        y='0.5'
                        width='29'
                        height='29'
                        rx='14.5'
                        stroke='black'
                        strokeOpacity='0.05'
                      />
                      <path
                        d='M17.9173 20.8337L12.084 15.0003L17.9173 9.16699'
                        stroke='black'
                        strokeOpacity='0.7'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>

                    <span className='flex'>
                      {[...Array(totalPages)].map((_, pageNum) => (
                        <button
                          key={pageNum + 1}
                          onClick={() => setCurrentPage(pageNum + 1)}
                          className={`rounded-full p-1 px-3 mx-1 ${
                            currentPage === pageNum + 1
                              ? "bg-[#AA00CC] text-white"
                              : "bg-transparent"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      ))}
                    </span>

                    <svg
                      width='30'
                      height='30'
                      onClick={nextPage}
                      className='cursor-pointer'
                      viewBox='0 0 30 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='0.5'
                        y='0.5'
                        width='29'
                        height='29'
                        rx='14.5'
                        stroke='black'
                        strokeOpacity='0.05'
                      />
                      <path
                        d='M12.084 9.16699L17.9173 15.0003L12.084 20.8337'
                        stroke='black'
                        strokeOpacity='0.7'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <Link to={`/campaigns/${campaign.id}`}>
      <div className='bg-white p-3 py-6 flex flex-col lg:flex-row items-center justify-between rounded-[14px] px-5'>
        <div className='flex items-center md:justify-between w-full lg:w-auto'>
          <CircularProgressWithLabel value={70} />
          <div className='lg:ml-12 ml-4 md:mr-0'>
            <h4 className='text-[#AA00CC] text-[12px] font-[400]'>
              {campaign.id.slice(0, 7)}
            </h4>
            <h5 className='text-[#2E2E2E] text-[14px] my-2'>{campaign.name}</h5>
            <p className='text-[#737373] text-[12px]'>
              Published on {new Date(campaign.created_at).toDateString()}
            </p>
          </div>
        </div>
        <div className='flex items-center justify-between mt-4 w-full md:w-[40%] lg:mt-0'>
          <div className='mr-4'>
            <h4 className='text-[14px]'>
              {formatToNaira(campaign.sub_plan.cost)}
            </h4>
            <p className='text-[12px] opacity-[50%]'>Cost</p>
          </div>
          <StatusPill status={campaign.status} />
        </div>
        <Box sx={{ width: "100%", display: { md: "none", xs: "block" } }}>
          <PrimaryButton
            //style={{ fontSize: "7px !important" }}
            className='text-[14px] px-4 mt-4 w-full lg:mt-0'
          >
            View report
          </PrimaryButton>
        </Box>
        <Box sx={{ display: { md: "block", xs: "none" } }}>
          <PrimaryButton className=' text-[14px] px-4 mt-4 w-full lg:mt-0'>
            View report
          </PrimaryButton>
        </Box>
      </div>
    </Link>
  );
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface StatusPillProps {
  status: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  let backgroundColor = "";
  let textColor = "";

  switch (status.toLowerCase()) {
    case "ongoing":
      backgroundColor = "#eef7ec";
      textColor = "#52B141";
      break;
    case "expired":
      backgroundColor = "#f9e8e8";
      textColor = "#F83737";
      break;
    case "in-review":
      backgroundColor = "#f0f0f0";
      textColor = "#737373";
      break;
    default:
      backgroundColor = "#eef7ec";
      textColor = "#52B141";
  }

  return (
    <div className='rounded-[8px] px-4 py-1' style={{ backgroundColor }}>
      <p className='text-[12px]' style={{ color: textColor }}>
        {status}
      </p>
    </div>
  );
};

// Play, Pause, Stop Icons Components
// const PlayIcon = () => (
//   <svg
//     width='28'
//     height='29'
//     viewBox='0 0 28 29'
//     fill='none'
//     xmlns='http://www.w3.org/2000/svg'
//   >
//     <rect
//       opacity='0.4'
//       x='0.5'
//       y='1.29199'
//       width='26.4162'
//       height='26.4162'
//       rx='13.2081'
//       stroke='#8E8E8E'
//       stroke-opacity='0.4'
//     />
//     <path
//       d='M11.436 14.4998L11.436 12.7549C11.436 10.973 13.5902 10.0807 14.8502 11.3406L16.8639 13.3543C17.6449 14.1354 17.6449 15.4017 16.8639 16.1828L14.8502 18.1965C13.5902 19.4564 11.436 18.5641 11.436 16.7823L11.436 14.4998Z'
//       fill='#AA00CC'
//     />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg
//     width='28'
//     height='29'
//     viewBox='0 0 28 29'
//     fill='none'
//     xmlns='http://www.w3.org/2000/svg'
//   >
//     <rect
//       opacity='0.4'
//       x='0.916016'
//       y='1.29199'
//       width='26.4162'
//       height='26.4162'
//       rx='13.2081'
//       stroke='#8E8E8E'
//       stroke-opacity='0.4'
//     />
//     <path
//       d='M15.4685 9.93113C15.4685 9.63423 15.7092 9.39355 16.0061 9.39355H17.0813C17.3782 9.39355 17.6188 9.63423 17.6188 9.93113V18.5323C17.6188 18.8292 17.3782 19.0699 17.0813 19.0699H16.0061C15.7092 19.0699 15.4685 18.8292 15.4685 18.5323V9.93113Z'
//       fill='#2E2E2E'
//     />
//     <path
//       d='M11.168 9.93113C11.168 9.63423 11.4086 9.39355 11.7055 9.39355H12.7807C13.0776 9.39355 13.3183 9.63423 13.3183 9.93113V18.5323C13.3183 18.8292 13.0776 19.0699 12.7807 19.0699H11.7055C11.4086 19.0699 11.168 18.8292 11.168 18.5323V9.93113Z'
//       fill='#2E2E2E'
//     />
//   </svg>
// );

// const StopIcon = () => (
//   <svg
//     width='29'
//     height='29'
//     viewBox='0 0 29 29'
//     fill='none'
//     xmlns='http://www.w3.org/2000/svg'
//   >
//     <rect
//       opacity='0.4'
//       x='1.33203'
//       y='1.29199'
//       width='26.4162'
//       height='26.4162'
//       rx='13.2081'
//       stroke='#F83737'
//       stroke-opacity='0.4'
//     />
//     <rect
//       x='9.9707'
//       y='9.39355'
//       width='9.6763'
//       height='9.6763'
//       rx='2'
//       fill='#F83737'
//     />
//   </svg>
// );

export default Campaigns;
