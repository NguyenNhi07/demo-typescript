import { useEffect, useState } from 'react';
import { DepartmentType } from '../config/Type';
import { customAxios } from '../config/axios';

function useDepartments({
  limit = 999,
  page = 1,
  search = '',
  useDepartments,
}: {
  useDepartments?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}) {
  const [departments, setDepartments] = useState<{ items: DepartmentType[]; meta: any }>({
    items: [],
    meta: {},
  });

  useEffect(() => {
    async function fetchDeparment() {
      const departmentAPI = `/department/list?limit=${limit}&page=${page}&search=${search}`;
      try {
        const resutl = await customAxios.get(departmentAPI);

        setDepartments(resutl.data.data);
      } catch (error) {}
    }
    fetchDeparment();
  }, [useDepartments, page, search]);

  return departments;
}

export default useDepartments;
