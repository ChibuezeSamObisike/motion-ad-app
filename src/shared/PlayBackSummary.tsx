import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import emptyAsset from 'assets/empty-asset.svg';

interface PlayBackSummaryProps {
  className?: string;
  data: PlaybackSummary[];
}

interface PlaybackSummary {
  total_playback: number;
  month: string;
}

const PlayBackSummary: FC<PlayBackSummaryProps> = ({ className, data }) => {
  const chartData = data.map((item) => ({
    month: item.month,
    value: item.total_playback,
  }));

  return (
    <div
      className={`p-4 md:p-6 lg:p-8 shadow-md bg-white my-4 rounded-md ${className}`}
    >
      <div className='py-4 flex justify-between'>
        <h2 className='font-bold text-lg md:text-xl'>Playback Summary</h2>
        <div className='text-sm md:text-base'>Sort</div>
      </div>

      {chartData?.length === 0 && (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          px={4}
          py={2}
        >
          <img src={emptyAsset} alt='empty-asset' />
          <Typography fontSize='14px'>No active playback summary</Typography>
        </Box>
      )}

      {chartData?.length !== 0 && (
        <div className='overflow-x-auto'>
          <AreaChart
            width={600}
            height={300}
            data={chartData}
            className='min-w-[300px]'
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type='monotone'
              dataKey='value'
              stroke='#50D37D'
              fill='rgba(193, 240, 216, 0.5)'
            />
          </AreaChart>
        </div>
      )}
    </div>
  );
};

export default PlayBackSummary;
