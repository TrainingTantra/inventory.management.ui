import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import NotFound from './pages/NotFound';

import Dashboard from './pages/internal/Dashboard';
import Home from './pages/main/Home';
import User from './pages/internal/User/User';
import LoginPage from './pages/main/Login';
import SignupPage from './pages/main/Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />} >
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />} >
        <Route index element={<Dashboard />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/user' element={<User />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
