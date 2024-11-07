import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../features/taskSlice';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<
      Task,
      { id: string; title: string; status: 'pending' | 'completed' }
    >({
      query: ({ id, ...updatedFields }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: updatedFields,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
