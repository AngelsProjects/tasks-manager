import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTaskMutation } from '../api/taskApi';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import * as z from 'zod';
import SnackbarAlert from './SnackbarAlert';

const schema = z.object({
  title: z.string().min(1, 'Task title is required'),
  status: z
    .enum(['pending', 'completed'])
    .refine((val) => val === 'pending' || val === 'completed', {
      message: 'Invalid status',
    }),
});

const TaskForm: React.FC = () => {
  const [addTask] = useAddTaskMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await addTask(data);
      setSnackbar({
        open: true,
        message: 'Task added successfully',
        severity: 'success',
      });
      reset(); // Clear the form
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add task',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 border rounded shadow-lg transition-all duration-200 ease-in-out hover:shadow-2xl"
    >
      <Typography variant="h5" className="text-blue-600 font-bold">
        Add New Task
      </Typography>
      <TextField
        label="Title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title ? errors.title.message?.toString() : ''}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select {...register('status')} defaultValue="pending">
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-full transition-transform duration-200 hover:scale-105"
        disabled={loading}
      >
        {loading ? 'Adding Task...' : 'Add Task'}
      </Button>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </form>
  );
};

export default TaskForm;
