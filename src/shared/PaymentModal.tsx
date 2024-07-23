import { useState } from "react";
import {
  Box,
  Modal,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "shared/Buttons";

interface PaymentModalProps {
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
};

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [paidWith, setPaidWith] = useState<string>("card");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expDate, setExpDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box sx={style}>
        <div className='flex justify-between items-center m-4'>
          <h2 id='modal-title' className='text-xl'>
            Payment Method
          </h2>
          <Button onClick={onClose} style={{ minWidth: "auto" }}>
            <CloseIcon />
          </Button>
        </div>
        <hr />

        <div className='py-4 mx-auto items-center px-8'>
          <h1 className='text-xl'>Pay With:</h1>
          <RadioGroup
            row
            aria-label='paidWith'
            name='paidWith'
            value={paidWith}
            onChange={(event) => setPaidWith(event.target.value)}
          >
            <FormControlLabel value='card' control={<Radio />} label='Card' />
            <FormControlLabel value='bank' control={<Radio />} label='Bank' />
          </RadioGroup>
        </div>

        {paidWith === "card" ? (
          <div className='mx-auto items-center px-8'>
            <TextField
              label='Card Number'
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              fullWidth
              variant='outlined'
            />
            <div className='flex pt-4 items-center gap-4'>
              <TextField
                label='Expriration  Date'
                value={expDate}
                onChange={(event) => setExpDate(event.target.value)}
                fullWidth
                variant='outlined'
              />
              <TextField
                label='Cvv'
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                fullWidth
                variant='outlined'
              />
            </div>
          </div>
        ) : (
          <div className='mx-auto items-center p-8'>
            <RadioGroup aria-label='bankType' name='bankType'>
              <FormControlLabel
                value='savings'
                control={<Radio />}
                label='Savings Account'
              />

              <FormControlLabel
                value='current'
                control={<Radio />}
                label='Current Account'
              />
              <FormControlLabel
                value='salary'
                control={<Radio />}
                label='Salary Account'
              />
            </RadioGroup>
          </div>
        )}

        <div className='mx-auto items-center p-8'>
          <PrimaryButton className='px-4 mt-3'>Confirm</PrimaryButton>
          <button className='text-[#006E88] rounded-full border border-gray-500 w-full px-4 py-2 mt-3'>
            Add new card
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
