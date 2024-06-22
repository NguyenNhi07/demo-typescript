import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/pagenation.css';

const PageNationUser = ({ totalPage }: { totalPage: number }) => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const handleClick: (toPage: number) => void = (toPage) => {
    navigate(`/user?page=${toPage}`);
    setPage(toPage);
  };
  const pages = Array(totalPage)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <>
      <div className="pagination">
        {pages.map((page) => (
          <div className="page-numbers" key={page}>
            <button
              className="page-number"
              onClick={() => {
                handleClick(page);
              }}
            >
              {page}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PageNationUser;
