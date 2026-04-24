import '../styles/components.css';

const Pagination = ({ currentPage, numOfPages, onPageChange }) => {
  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        id="prev-page-btn"
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>

      <div className="page-numbers">
        {pages.map((page) => (
          <button
            key={page}
            id={`page-btn-${page}`}
            className={`page-btn ${page === currentPage ? 'page-btn-active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        id="next-page-btn"
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === numOfPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
