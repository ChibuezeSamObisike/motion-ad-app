import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Modal, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "./Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "lib/apiService";

interface LeaveFeedbackModalProps {
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

const LeaveFeedbackModal: React.FC<LeaveFeedbackModalProps> = ({ onClose }) => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiService.post(`/campaign/${id}/feedback`, { content });

      toast.success("Feedback submitted successfully");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box sx={style}>
          <div className='flex justify-between items-center m-4'>
            <h2 id='modal-title' className='text-xl'>
              Leave Feedback
            </h2>
            <Button onClick={onClose} style={{ minWidth: "auto" }}>
              <CloseIcon />
            </Button>
          </div>
          <hr />
          <div className='p-8'>
            <p id='modal-description' className='text-sm  mb-4 text-gray-500'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Aspernatur doloremque ea, debitis, nemo quaerat rem explicabo,
              fugiat est aliquam dignissimos voluptas nesciunt sapiente
              reiciendis sit veniam omnis odit alias autem.
            </p>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <div className='relative'>
                <TextField
                  label='Your Feedback'
                  type='textarea'
                  multiline
                  rows={8}
                  inputProps={{ step: 50 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mt: 3 }}
                  placeholder='type your thoughts here....'
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <PrimaryButton
                  type='submit'
                  isLoading={isLoading}
                  disabled={isLoading}
                  className='w-sm mt-4'
                >
                  Submit
                </PrimaryButton>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LeaveFeedbackModal;
