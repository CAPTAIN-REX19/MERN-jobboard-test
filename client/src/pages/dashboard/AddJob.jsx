import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import Alert from '../../components/Alert';
import '../../styles/AddJob.css';

const statusOptions = ['pending', 'interview', 'declined'];
const jobTypeOptions = ['full-time', 'part-time', 'remote'];

const AddJob = () => {
  const {
    isLoading,
    showAlert,
    alertType,
    alertText,
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    status,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  useEffect(() => {
    if (!isEditing) clearValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await editJob();
    } else {
      await createJob();
    }
  };

  const onChange = (e) => handleChange(e.target.name, e.target.value);

  return (
    <div className="add-job-page">
      <h2 className="page-title">{isEditing ? 'Edit Job' : 'Add Job'}</h2>

      {showAlert && <Alert type={alertType} text={alertText} />}

      <div className="form-card">
        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                id="position"
                type="text"
                name="position"
                placeholder="e.g. Frontend Developer"
                value={position}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                id="company"
                type="text"
                name="company"
                placeholder="e.g. Google"
                value={company}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobLocation">Job Location *</label>
              <input
                id="jobLocation"
                type="text"
                name="jobLocation"
                placeholder="e.g. New York, USA"
                value={jobLocation}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={status} onChange={onChange}>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <select id="jobType" name="jobType" value={jobType} onChange={onChange}>
                {jobTypeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              id="clear-job-btn"
              type="button"
              className="btn btn-outline"
              onClick={clearValues}
            >
              Clear
            </button>
            <button
              id="submit-job-btn"
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
