import { useAppContext } from '../context/appContext';
import '../styles/components.css';

const statusOptions = ['all', 'pending', 'interview', 'declined'];
const jobTypeOptions = ['all', 'full-time', 'part-time', 'remote'];
const sortOptions = ['latest', 'oldest', 'a-z', 'z-a'];

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const SearchFilters = ({ onSearch }) => {
  const { search, searchStatus, searchType, sort, handleChange } = useAppContext();

  const onChange = (e) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    handleChange('search', '');
    handleChange('searchStatus', 'all');
    handleChange('searchType', 'all');
    handleChange('sort', 'latest');
    onSearch();
  };

  const isDirty = search || searchStatus !== 'all' || searchType !== 'all' || sort !== 'latest';

  return (
    <div className="search-filters">
      <div className="filters-header">
        <span className="filters-title">
          <FilterIcon />
          Filter Jobs
        </span>
        {isDirty && (
          <button
            id="clear-filters-btn"
            type="button"
            className="filters-clear-btn"
            onClick={handleClear}
          >
            Clear filters
          </button>
        )}
      </div>

      <form className="filters-form" onSubmit={handleSubmit}>
        {/* Search input with icon */}
        <div className="filter-group filter-group--search">
          <label htmlFor="search-input">Search position</label>
          <div className="input-icon-wrapper">
            <span className="input-icon"><SearchIcon /></span>
            <input
              id="search-input"
              type="text"
              name="search"
              placeholder="e.g. Frontend Developer..."
              value={search}
              onChange={onChange}
            />
          </div>
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
          <label htmlFor="search-sort">Sort by</label>
          <select id="search-sort" name="sort" value={sort} onChange={onChange}>
            {sortOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group filter-group--action">
          <label className="filter-label-spacer">&nbsp;</label>
          <button id="search-btn" type="submit" className="btn btn-primary">
            <SearchIcon />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
