import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminSignIn from './pages/AdminSignIn';
import AllStudents from './pages/AllStudents';
import StudentDetails from './pages/StudentDetails';
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import Alltasks from './pages/Alltasks';
import TaskDetails from './pages/TaskDetails'
import TaskUpdate from './pages/TaskUpdate';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div>
      <Router>
          <Navbar />
          <div className="container">
          <Routes>
              <Route path='/' element={ <AdminSignIn /> } />
              <Route path='/student/:id' element={ <StudentDetails /> } />
              <Route path='/tasks' element={ <Tasks /> } />
              <Route path='/taskdetails/:taskID' element={ <TaskDetails /> } />
              <Route path='/taskupdate' element={ <TaskUpdate /> } />
              <Route path='/dashboard' element={ <Dashboard /> } />
              <Route path='/alltasks' element={ <Alltasks />} />
              <Route path='*' element={ <PageNotFound/> } />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
