import ConfirmationDialog from './ConfirmationDialog';
import React, { useCallback, useState } from 'react';
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../api/taskApi';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileText,
} from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import SnackbarAlert from './SnackbarAlert';
import UpdateTaskDialog from './UpdateTaskDialog';
import { Task } from '../features/taskSlice';

const TaskList: React.FC = () => {
  const { data: tasks, error, isLoading } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    taskId: string | null;
  }>({ open: false, taskId: null });
  const [updateTaskDialog, setUpdateTaskDialog] = useState<{
    open: boolean;
    task: any | null;
  }>({ open: false, task: null });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const handleDelete = useCallback(
    async (taskId: string) => {
      try {
        await deleteTask(taskId);
        setSnackbar({
          open: true,
          message: 'Task deleted successfully',
          severity: 'success',
        });
      } catch {
        setSnackbar({
          open: true,
          message: 'Failed to delete task',
          severity: 'error',
        });
      }
    },
    [deleteTask, setSnackbar]
  );

  const handleOpenConfirmationDialog = useCallback(
    (taskId: string) => {
      setConfirmationDialog({ open: true, taskId });
    },
    [setConfirmationDialog]
  );

  const handleConfirmDelete = useCallback(() => {
    if (confirmationDialog.taskId) {
      handleDelete(confirmationDialog.taskId);
    }
  }, [confirmationDialog, handleDelete]);

  const handleUpdate = useCallback(
    async (updatedTask: Task) => {
      await updateTask(updatedTask);
      setSnackbar({
        open: true,
        message: 'Task updated successfully',
        severity: 'success',
      });
      setUpdateTaskDialog({ open: false, task: null });
    },
    [setSnackbar, setUpdateTaskDialog]
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [setSnackbar, snackbar]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={80}
            className="rounded-md"
          />
        ))}
      </div>
    );
  }
  if (error) return <Typography color="error">Error loading tasks</Typography>;

  return (
    <div className="space-y-4">
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
      {updateTaskDialog.task && (
        <UpdateTaskDialog
          open={updateTaskDialog.open}
          onClose={() => setUpdateTaskDialog({ open: false, task: null })}
          task={updateTaskDialog.task}
          onUpdate={handleUpdate}
        />
      )}
      <ConfirmationDialog
        open={confirmationDialog.open}
        onClose={() => setConfirmationDialog({ open: false, taskId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
      {tasks && tasks.length > 0 ? (
        tasks?.map((task) => (
          <Card
            key={task.id}
            className="p-4 flex justify-between items-center shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <CardContent className="flex items-center space-x-4">
              <FiCheckCircle
                className={`text-2xl ${
                  task.status === 'completed'
                    ? 'text-green-500'
                    : 'text-gray-400'
                }`}
              />
              <Typography variant="h6" className="font-semibold">
                {task.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="italic"
              >
                ({task.status})
              </Typography>
            </CardContent>
            <div className="flex space-x-2">
              <IconButton
                color="primary"
                onClick={() => setUpdateTaskDialog({ open: true, task })}
              >
                <AiOutlineEdit />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleOpenConfirmationDialog(task.id)}
              >
                <AiOutlineDelete />
              </IconButton>
            </div>
          </Card>
        ))
      ) : (
        // Empty State Message
        <div className="flex flex-col items-center justify-center h-full mt-20 space-y-4 animate-bounce">
          <AiOutlineFileText className="text-6xl text-gray-400" />
          <Typography variant="h6" className="text-gray-500">
            No tasks available. Add a new task to get started!
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TaskList;
