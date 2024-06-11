import { useState } from 'react';
import envelope from '../image/envelope.png';
import lock from '../image/lock.png';
import eyeSlash from '../image/eye-slash.png';
import '../Css/login.css';

function LoginUser() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [emptyPassword, setEmptyPassword] = useState<boolean>(false);

  const handleClick: () => void = () => {
    if (email === '') {
      setEmptyEmail(true);
    } else setEmptyEmail(false);

    if (password === '') {
      setEmptyPassword(true);
    } else setEmptyPassword(false);
  };

  return (
    <div className="container">
      <div className="login">
        <div className="header-title">
          <h3 className="title">Login</h3>
        </div>

        <div className="content">
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

              {emptyEmail ? (
                <div className="error-email">
                  <p className="title-error">This field can not be empty </p>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="input-pass-div">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={`input-password ${emptyPassword ? 'error-input' : ''}`}
                type="password"
                placeholder="Password"
                value={password}
              />
              <img className="img-pass" src={lock} alt="" />
              <img className="img-eye" src={eyeSlash} alt="" />

              {emptyPassword ? (
                <div className="error-pass">
                  {/* <p className="title-error">Email or password are incorrect.</p> */}
                  <p className="title-error">This field can not be empty </p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="button">
            <div>
              <button onClick={handleClick} className="btn-login">
                Login
              </button>
            </div>
            <div>
              <button className="btn-sign">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
