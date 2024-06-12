import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Department from './pages/Department';

function App() {
  return (
    <>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signin">Signin</Link>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/department" element={<Department />} />;
      </Routes>
    </>
  );
}

export default App;
