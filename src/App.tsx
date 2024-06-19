import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Department from './pages/Department';
import User from './pages/User';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/department" element={<Department />} />;
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
