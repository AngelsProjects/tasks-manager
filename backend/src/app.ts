import express from 'express';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use('/api', taskRoutes);
app.use(errorHandler);

export default app;
