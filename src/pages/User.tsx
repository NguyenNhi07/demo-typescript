import { useState } from 'react';
import { customAxios } from '../config/axios';
import SideBarUser from '../component/SideBarUser';
import UserItem from '../component/UserItem';
import Delete from '../component/Delete';
import LogOut from '../component/LogOut';
import '../Css/user.css';
import { useSearchParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import PageNationUser from '../component/PageNationUser';
import SearchItemUser from '../component/SearchItemUser';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { UsersType } from '../config/Type';

function User() {
  const [updateCount, setUpdateCount] = useState(0);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [prepareDelete, setPrepareDelete] = useState<number>(0);
  const [seachParams, _setSearchParams] = useSearchParams();

  // const user = useUser({
  //   limit: 3,
  //   page: Number(seachParams.get('page') || 1),
  //   search: seachParams.get('search') || '',
  //   updateCount,
  // });

  const {
    data: user,
    error,
    isLoading,
  } = useSWR<{
    items: UsersType[];
    meta: any;
  }>('/user/list', async () => {
    const res = await customAxios.get(
      `/user/list?limit=3&page=${Number(seachParams.get('page') || 1)}&search=${
        seachParams.get('search') || ''
      }`,
    );
    return res.data.data;
  });

  if (isLoading) return <>Loading</>;

  const handleDelete: (id: number) => void = async (id) => {
    try {
      await customAxios.delete(`/user/${id}`);
      setShowDelete(false);
      mutate('/user/list');
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

                  {/* Search Item */}
                  <SearchItemUser />

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
            {/* {user?.items.map((userItem) => (
              <UserItem
                key={userItem.id}
                user={userItem}
                users={user.items}
                setUpdateCount={setUpdateCount}
                updateCount={updateCount}
                setShowDelete={setShowDelete}
                setPrepareDelete={setPrepareDelete}
              />
            ))}

            <PageNationUser totalPage={user?.meta.totalPages} /> */}

            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                {user?.items.map((userItem) => (
                  <UserItem
                    key={userItem.id}
                    user={userItem}
                    users={user.items}
                    setUpdateCount={setUpdateCount}
                    updateCount={updateCount}
                    setShowDelete={setShowDelete}
                    setPrepareDelete={setPrepareDelete}
                  />
                ))}

                <PageNationUser totalPage={user?.meta.totalPages} />
              </>
            )}
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
