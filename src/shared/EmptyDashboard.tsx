import { useNavigate } from "react-router-dom";
import PrimaryButton from "shared/Buttons";

const EmptyDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='bg-white p-6 w-[500px] h-[250px] flex flex-col items-center justify-center rounded-[14px]'>
        <p>No Campaigns Yet!</p>
        <PrimaryButton
          onClick={() => navigate("/campaigns")}
          className='px-6 mt-5'
        >
          Create new campaign
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EmptyDashboard;
