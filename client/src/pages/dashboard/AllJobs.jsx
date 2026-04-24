import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Alert from '../../components/Alert';
import JobCard from '../../components/JobCard';
import SearchFilters from '../../components/SearchFilters';
import Pagination from '../../components/Pagination';
import '../../styles/AllJobs.css';

const AllJobs = () => {
  const {
    isLoading,
    jobs,
    totalJobs,
    numOfPages,
    page,
    showAlert,
    alertType,
    alertText,
    getJobs,
    setEditJob,
    deleteJob,
    changePage,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleEdit = (job) => {
    setEditJob(job);
    navigate('/dashboard/add-job');
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Delete this job?')) {
      deleteJob(jobId);
    }
  };

  return (
    <div className="all-jobs-page">
      <h2 className="page-title">All Jobs</h2>

      {showAlert && <Alert type={alertType} text={alertText} />}

      <SearchFilters onSearch={getJobs} />

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">💼</span>
          <h3>No jobs found</h3>
          <p>Add your first job application to get started.</p>
        </div>
      ) : (
        <>
          <p className="jobs-count">
            <strong>{totalJobs}</strong> job{totalJobs !== 1 ? 's' : ''} found
          </p>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={() => handleEdit(job)}
                onDelete={() => handleDelete(job._id)}
              />
            ))}
          </div>
          {numOfPages > 1 && (
            <Pagination
              currentPage={page}
              numOfPages={numOfPages}
              onPageChange={changePage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllJobs;
