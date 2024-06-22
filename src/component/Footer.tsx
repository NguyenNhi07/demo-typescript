import axios from 'axios';
import '../Css/footer.css';
import { customAxios } from '../config/axios';
import { useEffect, useState } from 'react';

function Footer() {
  const [pages, setPages] = useState<number>(0);
  console.log('🚀 ~ Footer ~ pages:', pages);
  return (
    <>
      <div className="footer">
        <div className="pagination">
          {/* <button className="previous-page">
            <div className="pagination-button-content">
              <p className="pagination-arrow">&lt;</p>
            </div>
          </button> */}

          <div className="page-numbers">
            <button className="page-number active">{}</button>
          </div>

          {/* <button className="next-page">
            <div className="pagination-button-content">
              <p className="pagination-arrow">&gt;</p>
            </div>
          </button> */}
        </div>
      </div>
    </>
  );
}

export default Footer;
