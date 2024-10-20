// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState,useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errs = {};
    if (credential.length < 4) errs.credential = "Credential must be at least 4 characters";
    if (password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
  }, [credential, password]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)  
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setErrors({message: "The provided credentials were invalid"});
        }
      });
  };


  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'xiaoxue', password: '1122334' }))
      .then(closeModal)
  }

  return (
    <>
      <h1>Log In</h1>
      <form 
      className='login_form'
      onSubmit={handleSubmit}>

        <label>
          Username or Email
          <input
            type="text"
            data-testid="credential-input"  // Test identifier for Playwright
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        {errors.credential && (
          <p>{errors.credential}</p>
        )}

        <label>
          Password
          <input
            type="password"
            data-testid="password-input"  // Test identifier for Playwright
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.password && (
          <p>{errors.password}</p>
        )}


        <button type="submit" disabled={Object.values(errors).length}>Log In</button>

        <button onClick={handleDemoLogin}>Login a Demo User</button>

      </form>
    </>
  );
}

export default LoginFormModal;