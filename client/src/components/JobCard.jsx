import { format } from 'date-fns';
import '../styles/components.css';

const statusColors = {
  pending: 'badge-pending',
  interview: 'badge-interview',
  declined: 'badge-declined',
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const { company, position, jobLocation, status, jobType, createdAt } = job;
  const date = createdAt ? format(new Date(createdAt), 'MMM d, yyyy') : '';

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-logo">
          {company.charAt(0).toUpperCase()}
        </div>
        <div className="job-card-title">
          <h3>{position}</h3>
          <span className="company-name">{company}</span>
        </div>
        <span className={`badge ${statusColors[status] || 'badge-pending'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="job-card-meta">
        <span className="meta-item">📍 {jobLocation}</span>
        <span className="meta-item">💼 {jobType}</span>
        <span className="meta-item">📅 {date}</span>
      </div>

      <div className="job-card-actions">
        <button
          id={`edit-job-${job._id}`}
          className="btn btn-sm btn-outline"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          id={`delete-job-${job._id}`}
          className="btn btn-sm btn-danger"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
