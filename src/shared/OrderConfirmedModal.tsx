import { Box, Modal, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from "shared/Buttons";

interface OrderModalProps {
  onClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '0',
  boxShadow: 24,
};

const OrderModal: React.FC<OrderModalProps> = ({ onClose }) => {
 


  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <div className='flex justify-between items-center m-4'>
          <h2 id="modal-title" className='text-xl'>Order Information</h2>
          <Button onClick={onClose} style={{ minWidth: 'auto' }}><CloseIcon /></Button>
        </div>
        <hr />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div className="text-black text-sm">Thank you for your purchase</div>
          <div className="text-black text-3xl">Order Confirmed</div>
        </div>
  
            <div className="mx-auto items-center p-8">
                <PrimaryButton className='px-4 mt-3'>See Campaign Status</PrimaryButton>
            </div>
        </Box>
    </Modal>
  );
}

export default OrderModal;
