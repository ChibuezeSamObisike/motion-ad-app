import { PrimaryButton } from "shared/Buttons";
import { useNavigate } from 'react-router-dom';
import Step2 from "assets/Step2.png";

const Completed = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[85%]'>
      <img src={Step2} className='w-[85px] mb-4' />
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Registration Completed
      </h5>
      <p className='text-[16px] text-[#92929D] font-[500]'>
        Thousands company like yours are manage their project and team in easy
        way
      </p>

      <div className='my-3 mt-6 w-[45%]'>
        <PrimaryButton onClick={handleContinue}>Continue to Dashboard</PrimaryButton>
      </div>
    </div>
  );
};

export default Completed;
