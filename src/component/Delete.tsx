import '../Css/delete.css';

function Delete({
  setShowDelete,
  handleDelete,
  prepareDelete,
}: {
  setShowDelete: (param: boolean) => void;
  handleDelete: (param: number) => void;
  prepareDelete: number;
}) {
  return (
    <div className="deleteWindow">
      <div className="windowdel">
        <div className="contentWindow">
          <div className="title">Bạn chắc chắn muốn xoá nội dung này</div>
          <div className="buttonWindow">
            <button onClick={() => setShowDelete(false)} className="cancel">
              Cancel
            </button>
            <button onClick={() => handleDelete(prepareDelete)} className="ok">
              OK
            </button>
          </div>
        </div>
      </div>

      <div className="offWindow">
        <button onClick={() => setShowDelete(false)} className="off">
          X
        </button>
      </div>
    </div>
  );
}

export default Delete;
