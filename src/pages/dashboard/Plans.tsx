import Invoices from "shared/Invoices";
import PlansData from "shared/PlansData";

const Plans = () => {
  return (
    <div className='w-full'>
      <div className=''>
        <PlansData />
      </div>

      <div>
        <Invoices />
      </div>
    </div>
  );
};

export default Plans;
