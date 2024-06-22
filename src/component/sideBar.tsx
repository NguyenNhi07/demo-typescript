import { useNavigate } from 'react-router-dom';
import setting from '../image/setting 1.png';
import keySquare from '../image/key-square.png';
import useSquare from '../image/user-square 1.png';
import '../Css/sidebar.css';

function SideBar() {
  const navigate = useNavigate();
  const handleUser: () => void = () => {
    navigate('/user');
  };
  return (
    <>
      <div className="left-content">
        <div className="dashboard">
          <div className="dashboard-header">
            <img src={setting} alt="" className="dashboard-icon" />
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          <div className="dashboard-sections">
            <div className="departments-section">
              <div className="departments-header">
                <div className="departments-icon-container">
                  <img src={keySquare} alt="" className="departments-icon" />
                </div>
                <p className="departments-title">Departments</p>
              </div>
            </div>

            <button onClick={() => handleUser()} className="users-section">
              <div className="users-header">
                <div className="users-icon-container">
                  <img src={useSquare} alt="" className="users-icon" />
                </div>
                <p className="users-title">User</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
