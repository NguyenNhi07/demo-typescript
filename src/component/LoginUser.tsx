import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import envelope from '../image/envelope.png';
import lock from '../image/lock.png';
import eyeSlash from '../image/eye-slash.png';
import '../Css/login.css';
import axios from 'axios';

function LoginUser() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleSubmit: (e: any) => void = async (e) => {
    e.preventDefault();
    if (email === '') {
      setEmptyEmail(true);
    } else setEmptyEmail(false);

    if (password === '') {
      setEmptyPassword(true);
    } else setEmptyPassword(false);

    if (email && password) {
      try {
        const result = await axios.post('https://2a66-118-70-190-141.ngrok-free.app/auth/login', {
          email: email,
          password: password,
        });

        localStorage.setItem('token', result.data.data.accessToken);
        localStorage.setItem('freshToken', result.data.data.refreshToken);

        console.log('🚀 ~ consthandleSubmit: ~ result:', result);
        setEmptyEmail(false);
        setEmptyPassword(false);
        navigate('/department');
      } catch (error: any) {
        setError(error.response.data.message);
        console.log('🚀 ~ consthandleSubmit: ~ error:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="header-title">
          <h3 className="title">Login</h3>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="content">
          <div className="login-input">
            <div className="input-email-div">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={`input-email ${emptyEmail ? 'error-empty-email' : ''}`}
                type="text"
                placeholder="Email"
                value={email}
              />
              <img className="img-email" src={envelope} alt="" />

              {emptyEmail && (
                <div className="error-email">
                  <p className="title-error">This field can not be empty </p>
                </div>
              )}
            </div>

            <div className="input-pass-div">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={`input-password ${emptyPassword ? 'error-empty-pass' : ''}`}
                type="password"
                placeholder="Password"
                value={password}
              />
              <img className="img-pass" src={lock} alt="" />
              <img className="img-eye" src={eyeSlash} alt="" />

              {emptyPassword && (
                <div className="error-pass">
                  {/* <p className="title-error">Email or password are incorrect.</p> */}
                  <p className="title-error">This field can not be empty </p>
                </div>
              )}
              {error && <p className="title-error">{error}</p>}
            </div>
          </div>
          <div className="button">
            <div>
              <input type="submit" className="btn-login" value="Login" />
            </div>
            <div>
              <button className="btn-sign">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
