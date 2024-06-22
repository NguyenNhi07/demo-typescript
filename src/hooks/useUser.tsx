import { useEffect, useState } from 'react';
import { customAxios } from '../config/axios';
import { UsersType } from '../config/Type';

function useUser({
  limit,
  page,
  updateCount,
  search,
}: {
  limit: number;
  page: number;
  updateCount: number;
  search: string;
}) {
  const [users, setUsers] = useState<{ items: UsersType[]; meta: any }>({ items: [], meta: {} });
  useEffect(() => {
    async function fetchUser() {
      const userAPI = `/user/list?limit=${limit}&page=${page}&search=${search}`;
      try {
        const result = await customAxios.get(userAPI);
        setUsers(result.data.data);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
    fetchUser();
  }, [updateCount, page, search]);
  return users;
}
export default useUser;
