import { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import SideBarUser from '../component/SideBarUser';
import UserItem from '../component/UserItem';
import Delete from '../component/Delete';
import { customAxios } from '../config/axios';
import LogOut from '../component/LogOut';

function User() {
  type UsersType = {
    id: number;
    username: string;
    department: string;
    email: string;
    departmentId: number;
  };
  const [users, setUsers] = useState<UsersType[]>([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [prepareDelete, setPrepareDelete] = useState<number>(0);

  useEffect(() => {
    async function fetchUser() {
      const userAPI = '/user/list';
      try {
        const result = await customAxios.get(userAPI);
        setUsers(result.data.data.items);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
    fetchUser();
  }, [updateCount]);

  const handleDelete: (id: number) => void = async (id) => {
    try {
      await customAxios.delete(`/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setShowDelete(false);
      setUpdateCount(updateCount + 1);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container-user">
        <SideBarUser />

        <div className="right-content">
          <div className="content">
            {/* Header */}
            <div className="content-header">
              <div className="heading-container">
                <div className="heading">
                  <div className="user-header">
                    <div className="header-title">
                      <h1 className="user-title">All Users</h1>
                    </div>
                    <LogOut />
                  </div>

                  <div className="search-container">
                    <div className="search-input-container">
                      <button className="search-icon-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="search-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                      </button>
                      <input type="text" className="search-input" placeholder="Search" />
                    </div>
                  </div>

                  <div className="user-heading">
                    <div className="user-header-row">
                      <div className="header-name">
                        <p className="header-name-text">Name</p>
                      </div>
                      <div className="header-department">
                        <p className="header-department-text">Department</p>
                      </div>
                      <div className="header-email">
                        <p className="header-email-text">Email</p>
                      </div>
                      <div className="header-action">
                        <p className="header-action-text">Action</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User List */}
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                users={users}
                setUsers={setUsers}
                setUpdateCount={setUpdateCount}
                updateCount={updateCount}
                setShowDelete={setShowDelete}
                setPrepareDelete={setPrepareDelete}
              />
            ))}

            <Footer />
          </div>
        </div>
      </div>

      {showDelete && (
        <Delete
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
          prepareDelete={prepareDelete}
        />
      )}
    </>
  );
}

export default User;
