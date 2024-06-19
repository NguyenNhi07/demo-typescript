import '../Css/footer.css';

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="pagination">
          <button className="previous-page">
            <div className="pagination-button-content">
              <p className="pagination-arrow">&lt;</p>
            </div>
          </button>
          <div className="page-numbers">
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <button className="page-number">4</button>
            <button className="page-number ellipsis">...</button>
            <button className="page-number">
              <p className="page-number-text">40</p>
            </button>
          </div>
          <button className="next-page">
            <div className="pagination-button-content">
              <p className="pagination-arrow">&gt;</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Footer;
