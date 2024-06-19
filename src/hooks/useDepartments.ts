import { useEffect, useState } from 'react';
import { DepartmentType } from '../component/Type';
import { customAxios } from '../config/axios';

function useDepartments(useDepartments?: boolean) {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  useEffect(() => {
    async function fetchDeparment() {
      const departmentAPI = '/department/list';
      try {
        const resutl = await customAxios.get(departmentAPI);

        setDepartments(resutl.data.data.items);
      } catch (error) {}
    }
    fetchDeparment();
  }, [useDepartments]);

  return departments;
}

export default useDepartments;
