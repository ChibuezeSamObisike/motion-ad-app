import { FC } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import emptyAsset from "assets/empty-asset.svg";
// Define the type for each item in the dataset
export interface PieChartDataItem {
  id: number;
  value: number;
  label: string;
  color: string;
}

// Define the props for the component
interface AppPieChartProps {
  title: string;
  data: { location: string; views: number }[];
}

// Define a function to generate colors for the pie slices
const generateColor = (index: number): string => {
  const colors = [
    "#548DFF",
    "#F58B28",
    "#4CDA1A",
    "#FF6B6B",
    "#4F9DA6",
    "#B5EAD7",
  ];
  return colors[index % colors.length];
};

const AppPieChart: FC<AppPieChartProps> = ({ title, data }) => {
  // Transform the incoming data to match the structure expected by the PieChart
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.views,
    label: item.location,
    color: generateColor(index),
  }));

  // Check if the data is empty
  const isEmpty = chartData.length === 0;

  return (

    <div className="pie-chart-container mt-5 ">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

    
      {isEmpty ? (
        <div className='empty-state flex flex-col justify-center items-center border border-dashed border-gray-300 rounded-lg'>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            px={4}
            py={6}
            width='100%'
            height='100%'
            textAlign='center'
          >
            <img src={emptyAsset} alt='No data available' className='mb-4' />
            <p className='text-gray-500'>No data available</p>
          </Box>
        </div>
      ) : (
        <>
          <PieChart
            colors={chartData.map((item) => item.color)}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "middle", horizontal: "right" },
                hidden: true,
              },
            }}
            sx={{ ml: 3, mt: 5 }}
            series={[
              {
                data: chartData,
                innerRadius: 65,
                outerRadius: 100,
                paddingAngle: 0,
                cornerRadius: -9,
                startAngle: 360,
                endAngle: 0,
              },
            ]}
            width={300}
            height={200}
          />
          <div className='flex mt-4 w-[70%] mx-auto'>
            {chartData.map(({ label, color }) => (
              <div className='flex mr-4 items-center' key={label}>
                <div
                  style={{
                    background: color,
                    width: "14px",
                    height: "14px",
                    marginRight: "4px",
                  }}
                />
                <p className='text-[#1D1B23] text-[14px] font-[400]'>{label}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppPieChart;
