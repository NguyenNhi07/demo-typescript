import { useState } from 'react';
import { DepartmentType } from './Type';
import '../Css/departmentItem.css';
import { customAxios } from '../config/axios';

function DepartmentItem({
  department,
  name,
  departments,
  setDepartments,
  setShowDelete,
  setPrepareDelete,
}: {
  department: { id: number; name: string };
  name: string;
  departments: DepartmentType[];
  setDepartments: (param: DepartmentType[]) => void;
  setShowDelete: (param: boolean) => void;
  setPrepareDelete: (param: number) => void;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(name);

  const updateName: (id: number, newName: string) => void = (id, newName) => {
    const updatedNameDepartment = departments.map((department) =>
      department.id === id ? { ...department, name: newName } : department,
    );
    setDepartments(updatedNameDepartment);
  };

  const handleSave: (id: number) => void = async (id) => {
    try {
      await customAxios.patch(`/department/${id}`, {
        name: editName,
      });
      updateName(id, editName);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div id="select-1" className="department-item">
        <div className="department-item-row">
          {edit ? (
            <>
              <div className="department-details">
                <div className="department-name">
                  <input
                    onChange={(e) => setEditName(e.target.value)}
                    type="text"
                    className="input-new-name"
                    value={editName}
                  />
                </div>

                <div className="department-actions">
                  <button
                    onClick={() => {
                      handleSave(department.id);
                      setEdit(false);
                    }}
                    className="edit-button"
                  >
                    <p className="button-text">Save</p>
                  </button>
                  <button onClick={() => setEdit(false)} className="delete-button">
                    <p className="button-text">Cancel</p>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="department-details">
                <div className="department-name">
                  <p className="department-name-text">{department.name}</p>
                </div>

                <div className="department-actions">
                  <button
                    onClick={() => {
                      setEdit(true);
                    }}
                    className="edit-button"
                  >
                    <p className="button-text">Edit</p>
                  </button>
                  <button
                    onClick={() => {
                      setShowDelete(true);
                      setPrepareDelete(department.id);
                    }}
                    className="delete-button"
                  >
                    <p className="button-text">Delete</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DepartmentItem;
