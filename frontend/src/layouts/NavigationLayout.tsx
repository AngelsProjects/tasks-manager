import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlinePlusCircle } from 'react-icons/ai';

const NavigationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AppBar position='sticky' className='bg-blue-600 shadow-md'>
        <Toolbar className='flex justify-between'>
          <Typography variant='h6' className='font-bold text-white'>
            Task Manager
          </Typography>
          <div className='space-x-4'>
            <Button
              component={Link}
              to='/'
              startIcon={<AiFillHome />}
              color='inherit'
              className='text-white'
            >
              Home
            </Button>
            <Button
              component={Link}
              to='/add-task'
              startIcon={<AiOutlinePlusCircle />}
              color='inherit'
              className='text-white'
            >
              Add Task
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <main className='p-6'>{children}</main>
    </div>
  );
};

export default NavigationLayout;
