import { useState, useEffect } from "react";
import { PrimaryButton } from "shared/Buttons";
import PaymentModal from "shared/PaymentModal";

const CampaignPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    const savedData = localStorage.getItem("campaignData");
    if (savedData) {
      const { name, description, images } = JSON.parse(savedData);
      setCampaignData({ name, description, images });
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='flex mb-4 justify-between'>
        <h2 className='text-black'>Preview Campaign</h2>
        <PrimaryButton className='px-4'>Make Changes</PrimaryButton>
      </div>

      <div className='flex items-start justify-between gap-4 w-full mt-5'>
        <div
          style={{ boxShadow: "0px 6px 24px 0px #3537510F" }}
          className='w-[55%] bg-white p-10 px-5 rounded-[12px]'
        >
          <h5>Campaign Name</h5>
          <h5 className='text-gray-400 py-2'>{campaignData.name}</h5>

          <div className='mt-6'>
            <h5>Desription</h5>
            <p className='text-gray-400'>{campaignData.description}</p>
          </div>
        </div>
        <div
          style={{ boxShadow: "0px 6px 24px 0px #3537510F" }}
          className='w-[45%] bg-white p-10 rounded-[12px]'
        >
          <h5 className='mb-4'>Campaign media</h5>
          {/* Render images */}
          <div className='flex flex-wrap gap-2'>
            {campaignData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                className={`${
                  index === 0 ? "w-full" : "w-[177px]"
                } h-[250px] object-cover rounded-md`}
                alt={`Image Preview ${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      <hr className='mt-10 mb-6' />

      <div className='flex justify-between'>
        <div>
          <span className='text-[#AA00CC] bg-[#D4A3FF] rounded-md text-sm p-2'>
            Current pricing plan
          </span>
          <h2 className='mt-2 text-3xl'>Basic ($140)</h2>
        </div>

        <div className='flex items-center gap-4'>
          <button className='px-4 border border-gray-700 py-2 rounded-full'>
            Change Plan
          </button>
          <PrimaryButton className='px-4' onClick={handleOpenModal}>
            Make Payment
          </PrimaryButton>
        </div>
      </div>

      {isModalOpen && <PaymentModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CampaignPreview;
