import { useAppContext } from '../context/appContext';
import '../styles/components.css';

const statusOptions = ['all', 'pending', 'interview', 'declined'];
const jobTypeOptions = ['all', 'full-time', 'part-time', 'remote'];
const sortOptions = ['latest', 'oldest', 'a-z', 'z-a'];

const SearchFilters = ({ onSearch }) => {
  const { search, searchStatus, searchType, sort, handleChange } = useAppContext();

  const onChange = (e) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-filters">
      <form className="filters-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="search-input">Search</label>
          <input
            id="search-input"
            type="text"
            name="search"
            placeholder="Search position..."
            value={search}
            onChange={onChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="search-status">Status</label>
          <select id="search-status" name="searchStatus" value={searchStatus} onChange={onChange}>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search-type">Job Type</label>
          <select id="search-type" name="searchType" value={searchType} onChange={onChange}>
            {jobTypeOptions.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search-sort">Sort</label>
          <select id="search-sort" name="sort" value={sort} onChange={onChange}>
            {sortOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button id="search-btn" type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;
