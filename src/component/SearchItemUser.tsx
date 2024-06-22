import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function SearchItemUser() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const formikSearchUser = useFormik({
    initialValues: {
      search: searchTerm,
    },
    onSubmit: async (values) => {},
  });

  useEffect(() => {
    const debounceItemList = debounce(async (value: string) => {
      navigate(`/user?search=${value}`);
    }, 1000);

    debounceItemList(formikSearchUser.values.search);
    return () => {
      debounceItemList.cancel();
    };
  }, [formikSearchUser.values.search, navigate]);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    formikSearchUser.setFieldValue('search', e.target.value);
  };

  return (
    <>
      <form onSubmit={formikSearchUser.handleSubmit} className="search-container">
        <div className="search-input-container">
          <div className="search-icon-button">
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
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </>
  );
}

export default SearchItemUser;
