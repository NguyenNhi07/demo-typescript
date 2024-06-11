import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <>
      <div>
        <Link to="/login">Login</Link>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
