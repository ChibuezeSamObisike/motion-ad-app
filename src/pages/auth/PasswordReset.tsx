import { PrimaryButton } from "shared/Buttons";
import { useNavigate } from 'react-router-dom';
import SuccessFilled from "assets/success-filled.png";

const PasswordReset = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className='h-full px-[50px] flex flex-col items-left text-left justify-center w-[80%]'>
      <img src={SuccessFilled} alt='success-filled' className='w-[81px]' />
      <h5 className='mb-[10px] text-[#11142D] text-[32px] text-left w-full text-[400]'>
        Password Reset Successfully
      </h5>
      <p className='text-[16px] text-[#92929D]'>
        Your new password reset was successful
      </p>
      <div className='w-[50%] mt-5'>
        <PrimaryButton onClick={handleLogin}>Login to Dashboard</PrimaryButton>
      </div>
    </div>
  );
};

export default PasswordReset;
