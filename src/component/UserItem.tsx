import useDepartments from '../hooks/useDepartments';
import { useEffect, useState } from 'react';
import style from '../Css/userItem.module.css';
import { UsersType } from '../config/Type';
import Select from 'react-select';
import { customAxios } from '../config/axios';

function UserItem({
  user,
  users,
  updateCount,
  setUpdateCount,
  setShowDelete,
  setPrepareDelete,
}: {
  user: UsersType;
  users: UsersType[];
  updateCount: number;
  setUpdateCount: (param: number) => void;
  setShowDelete: (param: boolean) => void;
  setPrepareDelete: (param: number) => void;
}) {
  const data = useDepartments({});

  const [selectDepartment, setSelectDepartment] = useState<{ name: string; id: number }>();
  useEffect(() => {
    setSelectDepartment({
      name: data.items.find((item) => item.id === user.departmentId)?.name || '',
      id: user.departmentId,
    });
  }, [data.items.length]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState(user.username);

  const handleSaveDepartment: (id: number) => void = async (id) => {
    try {
      await customAxios.patch(`/user/${id}/department`, {
        departmentId: selectDepartment?.id,
        username: editName,
      });
      setIsEdit(false);
      updateUserName(id, editName);
      setUpdateCount(updateCount + 1);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateUserName: (id: number, newName: string) => void = (id, newName) => {
    const newUserName = users.map((user) => (user.id === id ? { ...user, name: newName } : user));
    users = newUserName;
  };

  const handleCancel: () => void = () => {
    if (user.username !== editName) {
      setEditName(user.username);
    }
  };

  return (
    <>
      <div id="select-1" className={style.userItem}>
        <div className={style.userItemRow}>
          <div className={style.userDetails}>
            {isEdit ? (
              <div className={style.userName}>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={style.editUserName}
                />
              </div>
            ) : (
              <div className={style.userName}>
                <p className={style.userNameText}>{user.username}</p>
              </div>
            )}

            {isEdit ? (
              <div className={style.userSelect}>
                <Select
                  value={selectDepartment}
                  options={data.items}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => String(option.id)}
                  onChange={(e) => {
                    e && setSelectDepartment(e);
                  }}
                />
              </div>
            ) : (
              <div className={style.userDepartment}>
                <p className={style.userDepartmentText}>
                  {data.items.length
                    ? data.items.find((item) => item.id === user.departmentId)?.name
                    : 'loading'}
                </p>
              </div>
            )}

            <div className={style.userEmail}>
              <p className={style.userEmailText}>{user.email}</p>
            </div>

            {isEdit ? (
              <div className={style.userActions}>
                <button
                  onClick={() => {
                    handleSaveDepartment(user.id);
                  }}
                  className={style.editButton}
                >
                  <p className={style.buttonText}>Save</p>
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    handleCancel();
                  }}
                  className={style.deleteButton}
                >
                  <p className={style.buttonText}>Cancel</p>
                </button>
              </div>
            ) : (
              <div className={style.departmentActions}>
                <button onClick={() => setIsEdit(true)} className={style.editButton}>
                  <p className={style.buttonText}>Edit</p>
                </button>

                <button
                  onClick={() => {
                    setPrepareDelete(user.id);
                    setShowDelete(true);
                  }}
                  className={style.deleteButton}
                >
                  <p className={style.buttonText}>Delete</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserItem;
