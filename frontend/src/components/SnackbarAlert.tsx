import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant='filled'
        elevation={6}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
