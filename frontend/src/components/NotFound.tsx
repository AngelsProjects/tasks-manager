import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className='flex flex-col items-center mt-20'>
    <Typography variant='h3' color='error'>
      404: Page Not Found
    </Typography>
    <Link to='/'>
      <Button variant='contained' color='primary' className='mt-4'>
        Go to Home
      </Button>
    </Link>
  </div>
);

export default NotFound;
