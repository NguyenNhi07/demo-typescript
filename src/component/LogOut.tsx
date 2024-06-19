import '../Css/logout.css';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../config/axios';

function LogOut() {
  const navigate = useNavigate();
  const logoutHandle: () => void = async () => {
    try {
      await customAxios.post('/auth/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="logout-header">
        <button onClick={() => logoutHandle()} className="logout">
          <div className="logout-content">
            <p className="logout-text">Log Out</p>
          </div>
        </button>
      </div>
    </>
  );
}

export default LogOut;
