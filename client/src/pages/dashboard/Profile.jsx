import { useAppContext } from '../../context/appContext';
import '../../styles/Profile.css';

const Profile = () => {
  const { user } = useAppContext();

  return (
    <div className="profile-page">
      <h2 className="page-title">My Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <div className="profile-field">
            <span className="field-label">Full Name</span>
            <span className="field-value">{user?.name}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Email Address</span>
            <span className="field-value">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
