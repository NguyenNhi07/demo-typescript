import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/pagenation.css';

function PageNation({ totalPage }: { totalPage: number }) {
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();
  const handleClick: (toPage: number) => void = (toPage) => {
    navigate(`/department?page=${toPage}`);
  };

  const pagesList: number[] = Array(totalPage)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <>
      <div className="pagination">
        {pagesList.map((toPage) => (
          <div className="page-numbers" key={toPage}>
            <button
              className="page-number"
              onClick={() => {
                handleClick(toPage);
                setPages(toPage);
              }}
            >
              {toPage}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default PageNation;
