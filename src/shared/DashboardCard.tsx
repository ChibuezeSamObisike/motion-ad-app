import { Box } from "@mui/material";
import arrowUp from "assets/arrow-up.svg";

interface IProps {
  noBorder?: boolean;
  title: string;
  value: string;
  percentage: string;
  when: string;
}

const DashboardCard: React.FC<IProps> = ({
  noBorder,
  title,
  value,
  percentage,
  when,
}) => {
  return (
    <Box
      className='flex flex-col md:px-5 px-5 shadow-sm md:shadow-none py-5 w-full bg-white md:bg-transparent'
      sx={
        noBorder
          ? {}
          : {
              borderRight: { xs: "", md: "1px solid #D8D8D8" },
            }
      }
    >
      <h5 className='text-[#959595] text-[14px]'>{title}</h5>
      <h2 className='mt-2'>{value}</h2>
      <div className='mt-2 flex items-center'>
        <img src={arrowUp} className='mr-2' />
        <p className='text-[#248C00] text-[12px] mr-2'>{percentage}</p>
        <p className='text-[#959595] whitespace-nowrap text-[12px]'>{when}</p>
      </div>
    </Box>
  );
};

export default DashboardCard;
