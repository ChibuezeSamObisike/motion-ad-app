import React, { useEffect, useState } from "react";
import AppTable from "shared/AppTable";
import DashboardCard from "shared/DashboardCard";
import TopLocation from "shared/TopLocation";
import DashboardAnalytics from "shared/DashboardAnalytics";
import { fetchDashboardAnalytics } from "lib/apiService";
import { DashboardAnalyticsData } from "types/api";
import AppPieChart from "shared/AppPieChart";
import { Box } from "@mui/material";
import { RevolvingDot } from "react-loader-spinner";

const Dashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] =
    useState<DashboardAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        alignItems='center'
        height='100%'
        justifyContent='center'
        display='flex'
      >
        <RevolvingDot color='#aa00cc' width='10px' />
      </Box>
    );
  }

  if (!analyticsData) {
    return <div>Failed to load data.</div>;
  }

  const DASHBOARD_CARD_DATA = [
    {
      title: "Total Views",
      value: analyticsData.total_views.toLocaleString(),
      percentage: `${analyticsData.views_change > 0 ? "+" : ""}${
        analyticsData.views_change
      }%`,
      when: "This month",
    },
    {
      title: "Locations",
      value: analyticsData.locations.toLocaleString(),
      percentage: `${analyticsData.locations_change > 0 ? "+" : ""}${
        analyticsData.locations_change
      }%`,
      when: "This month",
    },
    {
      title: "Ads Spend",
      value: `$${(analyticsData.ads_spend / 100).toFixed(2)}`,
      percentage: `${analyticsData.ads_spend_change > 0 ? "+" : ""}${
        analyticsData.ads_spend_change
      }%`,
      when: "This month",
    },
  ];

  return (
    <div className='w-full text-black pt-6'>
      <div className='w-full'>
        <div className='flex flex-col lg:flex-row lg:space-x-8'>
          <div className='w-full lg:w-[70%]'>
            <h5 className='text-[#1A1A1A] text-[16px] mb-4 font-[600]'>
              Overview
            </h5>
            <div className='grid grid-cols-1 gap-8 w-full sm:grid-cols-2 lg:grid-cols-3'>
              {DASHBOARD_CARD_DATA.map((data, i) => (
                <DashboardCard noBorder={i === 2} {...data} key={i} />
              ))}
            </div>
            <div className='mt-10 sm:mt-16 lg:mt-10'>
              {analyticsData.monthly_data && (
                <DashboardAnalytics data={analyticsData.monthly_data} />
              )}
            </div>
          </div>

          <div className='w-full   lg:w-[30%]'>
            {analyticsData.top_locations && (
              <TopLocation
                className='mt-10 lg:mt-0  h-full'
                data={analyticsData?.top_locations || []}
              />
            )}
          </div>
        </div>

        <div className='mt-5 flex flex-col lg:flex-row lg:space-x-8'>
          <div className='w-full lg:w-[65%] '>
            {analyticsData.campaign_performance && (
              <AppTable
                title='Campaign Performance'
                header={[
                  { label: "Campaign", key: "campaign" },
                  { label: "Progress", key: "progress" },
                  { label: "Locations", key: "locations" },
                  { label: "Status", key: "status" },
                ]}
                data={analyticsData.campaign_performance}
              />
            )}
          </div>

          <div className='w-full lg:w-[35%] '>
            {analyticsData.top_locations && (
              <AppPieChart
                title='Demographics'
                data={analyticsData.top_locations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
