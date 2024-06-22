import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customAxios } from '../config/axios';
import * as Yup from 'yup';
import envelope from '../image/envelope.png';
import lock from '../image/lock.png';
import style from '../Css/signUp.module.css';

function SignUp() {
  const [isSuccess, setIsSuccess] = useState(false);
  let navigate = useNavigate();

  const handleClick: () => void = () => {
    navigate('/login');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field can not be empty'),
      email: Yup.string().email('Invalid email address').required('This field can not be empty'),
      password: Yup.string()
        .required('This field can not be empty')
        .min(8, 'Password length must be between 8-16 characters.')
        .max(16, 'Password length must be between 8-16 characters.')
        .test(
          'atLeastOneCapitalized',
          'Password must include at least one capitalized character.',
          (value: any, context: any) => {
            if (/[A-Z]/.test(value)) {
              return true;
            }
            return false;
          },
        )
        .test(
          'atLeastOneNumber',
          'Password must include at least one number.',
          (value: any, context: any) => {
            if (/[0-9]/.test(value)) {
              return true;
            }
            return false;
          },
        ),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Confirmation password does not match')
        .required('This field can not be empty'),
    }),
    onSubmit: async (values) => {
      try {
        await customAxios.post('/sign-up', {
          username: values.name,
          email: values.email,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });
        setIsSuccess(true);
      } catch (error) {
        console.error('Sign-up failed:', error);
      }
    },
  });

  return (
    <>
      <div className={style.body}>
        <div className={style.containerSign}>
          <div className={style.signin}>
            <div className={style.headerTitle}>
              <h3 className={style.title}>Sign Up</h3>
            </div>
            <form onSubmit={formik.handleSubmit} className={style.content}>
              <div className={style.signinInput}>
                <div className={style.inputNameDiv}>
                  <label htmlFor="name">Name</label>
                  <input
                    className={`${style.inputName} ${
                      formik.touched.name && formik.errors.name ? style.errorEmpty : ''
                    }`}
                    type="text"
                    placeholder="Name"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={style.errorEmail}>
                      <p className={style.titleError}>{formik.errors.name}</p>
                    </div>
                  ) : null}
                </div>
                <div className={style.inputEmailDiv}>
                  <label htmlFor="email">
                    Email<span>*</span>
                  </label>
                  <input
                    className={`${style.inputEmail} ${
                      formik.touched.email && formik.errors.email ? style.errorEmpty : ''
                    }`}
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                  />
                  <img className={style.imgEmailSign} src={envelope} alt="" />
                  {formik.touched.email && formik.errors.email ? (
                    <div className={style.errorEmail}>
                      <p className={style.titleError}>{formik.errors.email}</p>
                    </div>
                  ) : null}
                </div>
                <div className={style.inputPassDiv}>
                  <label htmlFor="password">
                    Password<span>*</span>
                  </label>
                  <input
                    className={`${style.inputPassword} ${
                      formik.touched.password && formik.errors.password ? style.errorEmpty : ''
                    }`}
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps('password')}
                  />
                  <img className={style.imgPassSign} src={lock} alt="" />
                  {formik.touched.password && formik.errors.password ? (
                    <div className={style.errorPass}>
                      <p className={style.titleError}>{formik.errors.password}</p>
                    </div>
                  ) : null}
                </div>
                <div className={style.inputPassDiv}>
                  <label htmlFor="passwordConfirm">
                    Password Confirmation<span>*</span>
                  </label>
                  <input
                    className={`${style.inputPassword} ${
                      formik.touched.passwordConfirm && formik.errors.passwordConfirm
                        ? style.errorEmpty
                        : ''
                    }`}
                    id="passwordConfirm"
                    type="password"
                    placeholder="Password Confirmation"
                    {...formik.getFieldProps('passwordConfirm')}
                  />
                  <img className={style.imgPassSign} src={lock} alt="" />
                  {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div className={style.errorPass}>
                      <p className={style.titleError}>{formik.errors.passwordConfirm}</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={style.button}>
                <div>
                  <input type="submit" className={style.btnSignin} value="Sign Up" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isSuccess && (
        <>
          <div className={style.coat}></div>
          <div className={style.successSignUpWindow}>
            <div className={style.successSignUp}>
              <div className={style.content}>
                <h1 className={style.title}>Sign Up Successfully Completed.</h1>
                <button onClick={() => handleClick()} className={style.backToLogin}>
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
