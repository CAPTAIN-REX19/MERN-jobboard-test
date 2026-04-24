import { createContext, useContext, useReducer } from 'react';
import customFetch from '../utils/customFetch';

// Load initial state from localStorage
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
  isLoading: false,
  user: user || null,
  token: token || null,
  showAlert: false,
  alertText: '',
  alertType: '',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  // filters
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  // edit job
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: '',
  jobType: 'full-time',
  status: 'pending',
};

const AppContext = createContext();

const ACTIONS = {
  DISPLAY_ALERT: 'DISPLAY_ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT',
  SET_LOADING: 'SET_LOADING',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_JOBS: 'SET_JOBS',
  SET_EDIT_JOB: 'SET_EDIT_JOB',
  CLEAR_EDIT_JOB: 'CLEAR_EDIT_JOB',
  HANDLE_CHANGE: 'HANDLE_CHANGE',
  CLEAR_VALUES: 'CLEAR_VALUES',
  CHANGE_PAGE: 'CHANGE_PAGE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.alertText,
      };
    case ACTIONS.CLEAR_ALERT:
      return { ...state, showAlert: false, alertText: '', alertType: '' };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ACTIONS.LOGOUT:
      return {
        ...initialState,
        user: null,
        token: null,
      };
    case ACTIONS.SET_JOBS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    case ACTIONS.SET_EDIT_JOB:
      return {
        ...state,
        isEditing: true,
        editJobId: action.payload._id,
        position: action.payload.position,
        company: action.payload.company,
        jobLocation: action.payload.jobLocation,
        jobType: action.payload.jobType,
        status: action.payload.status,
      };
    case ACTIONS.CLEAR_EDIT_JOB:
      return {
        ...state,
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: '',
        jobType: 'full-time',
        status: 'pending',
      };
    case ACTIONS.HANDLE_CHANGE:
      return { ...state, page: 1, [action.payload.name]: action.payload.value };
    case ACTIONS.CLEAR_VALUES:
      return {
        ...state,
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: user?.location || '',
        jobType: 'full-time',
        status: 'pending',
      };
    case ACTIONS.CHANGE_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (alertType, alertText) => {
    dispatch({ type: ACTIONS.DISPLAY_ALERT, payload: { alertType, alertText } });
    setTimeout(() => dispatch({ type: ACTIONS.CLEAR_ALERT }), 3000);
  };

  const authUser = async ({ formData, endPoint, alertText }) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const { data } = await customFetch.post(`/auth/${endPoint}`, formData);
      const { user, token } = data;
      dispatch({ type: ACTIONS.AUTH_SUCCESS, payload: { user, token } });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      displayAlert('success', alertText);
    } catch (error) {
      const msg = error?.response?.data?.msg || 'Something went wrong';
      displayAlert('danger', msg);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const logoutUser = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) url += `&search=${search}`;
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const { data } = await customFetch.get(url);
      dispatch({
        type: ACTIONS.SET_JOBS,
        payload: {
          jobs: data.jobs,
          totalJobs: data.totalJobs,
          numOfPages: data.numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const createJob = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await customFetch.post('/jobs', { position, company, jobLocation, jobType, status });
      dispatch({ type: ACTIONS.CLEAR_EDIT_JOB });
      displayAlert('success', 'New job created!');
    } catch (error) {
      const msg = error?.response?.data?.msg || 'Error creating job';
      displayAlert('danger', msg);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const editJob = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const { position, company, jobLocation, jobType, status, editJobId } = state;
      await customFetch.patch(`/jobs/${editJobId}`, {
        position, company, jobLocation, jobType, status,
      });
      dispatch({ type: ACTIONS.CLEAR_EDIT_JOB });
      displayAlert('success', 'Job updated!');
    } catch (error) {
      const msg = error?.response?.data?.msg || 'Error updating job';
      displayAlert('danger', msg);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await customFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      const msg = error?.response?.data?.msg || 'Error deleting job';
      displayAlert('danger', msg);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const setEditJob = (job) => {
    dispatch({ type: ACTIONS.SET_EDIT_JOB, payload: job });
  };

  const handleChange = (name, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: ACTIONS.CLEAR_VALUES });
  };

  const changePage = (page) => {
    dispatch({ type: ACTIONS.CHANGE_PAGE, payload: page });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authUser,
        logoutUser,
        getJobs,
        createJob,
        editJob,
        deleteJob,
        setEditJob,
        handleChange,
        clearValues,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext, initialState };
