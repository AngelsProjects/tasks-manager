import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import NotFound from '../components/NotFound';
import NavigationLayout from '../layouts/NavigationLayout';

const AppRoutes = () => {
  return (
    <Router>
      <NavigationLayout>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/add-task' element={<TaskForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </NavigationLayout>
    </Router>
  );
};

export default AppRoutes;
