import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchItem() {
  const [searchTerm, _setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const formikSearch = useFormik({
    initialValues: {
      search: searchTerm,
    },
    onSubmit: async (values) => {
      navigate(`/department?search=${values.search}`);
    },
  });

  //   useEffect(() => {
  //     navigate(`/department?search=${formikSearch.values.search}`);
  //   }, [formikSearch.values.search]);

  return (
    <>
      <form onSubmit={formikSearch.handleSubmit} className="search-container">
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
            {...formikSearch.getFieldProps('search')}
          />
        </div>
      </form>
    </>
  );
}

export default SearchItem;
