import style from '../Css/sidebarUser.module.css';
import setting from '../image/setting 1.png';
import keySquare from '../image/key-square-4.png';
import useSquare from '../image/user-square-5.png';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();
  const handleDepartment: () => void = () => {
    navigate('/department');
  };
  return (
    <>
      <div className="left-content">
        <div className={style.dashboard}>
          <div className={style.dashboardHeader}>
            <img src={setting} alt="" className={style.dashboardIcon} />
            <h1 className={style.dashboardTitle}>Dashboard</h1>
          </div>

          <div className={style.dashboardSections}>
            <button onClick={() => handleDepartment()} className={style.departmentSection}>
              <div className={style.userHeader}>
                <div className="departments-icon-container">
                  <img src={keySquare} alt="" className={style.departmentsIcon} />
                </div>
                <p className={style.departmentsTitle}>Departments</p>
              </div>
            </button>

            <div className={style.usersSection}>
              <div className={style.usersHeader}>
                <div className="users-icon-container">
                  <img src={useSquare} alt="" className={style.usersIcon} />
                </div>
                <p className={style.usersTitle}>User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
