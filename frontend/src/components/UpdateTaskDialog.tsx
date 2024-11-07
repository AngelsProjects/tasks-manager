import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface UpdateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: { id: string; title: string; status: 'pending' | 'completed' };
  onUpdate: (updatedTask: {
    id: string;
    title: string;
    status: 'pending' | 'completed';
  }) => void;
}

const schema = z.object({
  title: z.string().min(1, 'Task title is required'),
  status: z.enum(['pending', 'completed']),
});

const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({
  open,
  onClose,
  task,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: task,
  });

  const onSubmit = (data: any) => {
    onUpdate({ ...task, ...data });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Title"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select {...register('status')} defaultValue={task.status}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTaskDialog;
