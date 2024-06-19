import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import SideBar from '../component/sideBar';
import Footer from '../component/Footer';
import Delete from '../component/Delete';
import DepartmentItem from '../component/DepartmentItem';
import '../Css/department.css';
import '../Css/heading.css';
import useDepartments from '../hooks/useDepartments';
import LogOut from '../component/LogOut';
import { customAxios } from '../config/axios';

function Department() {
  type DepartmentType = {
    id: number;
    name: string;
  };

  const [addItem, setAddItem] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [prepareDelete, setPrepareDelete] = useState<number>(0);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  const data = useDepartments(addItem);

  useEffect(() => {
    if (data) setDepartments(data);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field can not be empty'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await customAxios.post('/department', {
          name: values.name,
        });
        setAddItem(false);
        formik.resetForm();
      } catch (error: any) {
        console.error('Error adding department:', error.message);
      }
    },
  });

  const handleDelete: (id: number) => void = async (id) => {
    try {
      await customAxios.delete(`/department/${id}`);
      setDepartments(departments.filter((department) => department.id !== id));
      setShowDelete(false);
    } catch (error: any) {
      console.error('Error deleting department:', error.message);
    }
  };

  return (
    <>
      <div className="container-department">
        <SideBar />

        <div className="right-content">
          <div className="content">
            {/* Header */}
            <div className="content-header">
              <div className="heading-container">
                <div className="heading">
                  <div className="department-header">
                    <div className="header-title">
                      <h1 className="department-title">All Departments</h1>
                    </div>
                    <LogOut />
                  </div>

                  {/* Add Item Button */}
                  <button
                    onClick={() => {
                      setAddItem(true);
                    }}
                    className="button-add-item"
                  >
                    Add New Item
                  </button>

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

                  <div className="department-heading">
                    <div className="department-header-row">
                      <div className="header-name">
                        <p className="header-name-text">Name</p>
                      </div>
                      <div className="header-action">
                        <p className="header-action-text">Action</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Department List */}
            {departments.map((department) => (
              <>
                <DepartmentItem
                  key={department.id}
                  name={department.name}
                  department={department}
                  departments={departments}
                  setDepartments={setDepartments}
                  setShowDelete={setShowDelete}
                  setPrepareDelete={setPrepareDelete}
                />
              </>
            ))}

            <Footer />
          </div>

          {addItem && (
            <form onSubmit={formik.handleSubmit}>
              <div className="add-item-form">
                <input
                  type="text"
                  placeholder="Department Name"
                  className="input-add-item"
                  {...formik.getFieldProps('name')}
                />
                <button className="submit-add-item-button">Add</button>
              </div>
            </form>
          )}
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

export default Department;
