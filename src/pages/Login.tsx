import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import envelope from '../image/envelope.png';
import lock from '../image/lock.png';
import eyeSlash from '../image/eye-slash.png';
import style from '../Css/login.module.css';
import { customAxios } from '../config/axios';

function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('This field can not be empty'),
      password: Yup.string().required('This field can not be empty'),
    }),

    onSubmit: async (values) => {
      try {
        const result = await customAxios.post('/auth/login', {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem('token', result.data.data.accessToken);
        navigate('/department');
      } catch (error: any) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.login}>
          <div className={style.headerTitle}>
            <h3 className={style.title}>Login</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className={style.content}>
            <div className={style.loginInput}>
              <div className={style.inputEmailDiv}>
                <input
                  className={`${style.inputEmail} ${
                    formik.touched.email && formik.errors.email ? style.errorEmpty : ''
                  }`}
                  type="text"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                />
                <img className={style.imgEmail} src={envelope} alt="" />
                {formik.touched.email && formik.errors.email ? (
                  <div className={style.errorPass}>
                    <p className={style.titleError}>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>
              <div className={style.inputPassDiv}>
                <input
                  className={`${style.inputPassword} ${
                    formik.touched.password && formik.errors.password ? style.errorEmpty : ''
                  }`}
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                />
                <img className={style.imgPass} src={lock} alt="" />
                <img className={style.imgEye} src={eyeSlash} alt="" />
                {formik.touched.password && formik.errors.password ? (
                  <div className={style.errorPass}>
                    <p className={style.titleError}>{formik.errors.password}</p>
                  </div>
                ) : null}
                {error && <p className={style.titleError}>{error}</p>}
              </div>
            </div>
            <div className={style.button}>
              <div>
                <input type="submit" className={style.btnLogin} value="Login" />
              </div>
              <div>
                <button className={style.btnSign}>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
