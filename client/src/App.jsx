import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/appContext';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectedRoute';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import AllJobs from './pages/dashboard/AllJobs';
import AddJob from './pages/dashboard/AddJob';
import Profile from './pages/dashboard/Profile';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AllJobs />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
