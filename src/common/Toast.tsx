import React, { useState, useEffect } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

interface ToastProps {
  severity: "error" | "warning" | "info" | "success";
  content: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  severity,
  content,
  duration = 5000,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = (
    _event: React.SyntheticEvent<Element, Event> | MouseEvent,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={duration}>
      <Alert severity={severity} onClose={handleClose}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
