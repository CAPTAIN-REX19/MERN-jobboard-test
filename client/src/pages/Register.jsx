import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Alert from '../components/Alert';
import '../styles/Register.css';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, alertType, alertText, authUser, token } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard/all-jobs');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if ((!isMember && !name) || !email || !password) return;

    const formData = isMember
      ? { email, password }
      : { name, email, password };

    await authUser({
      formData,
      endPoint: isMember ? 'login' : 'register',
      alertText: isMember ? 'Login successful! Redirecting...' : 'Account created! Redirecting...',
    });
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <span className="register-logo">JobBoard</span>
          <h2>{values.isMember ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{values.isMember ? 'Sign in to your account' : 'Start tracking your applications'}</p>
        </div>

        {showAlert && <Alert type={alertType} text={alertText} />}

        <form className="register-form" onSubmit={handleSubmit}>
          {!values.isMember && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange}
                required={!values.isMember}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : values.isMember ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="register-toggle">
          {values.isMember ? "Don't have an account?" : 'Already a member?'}{' '}
          <button
            id="toggle-auth-btn"
            type="button"
            className="link-btn"
            onClick={toggleMember}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
