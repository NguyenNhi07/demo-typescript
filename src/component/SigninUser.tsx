import { useFormik } from 'formik';
import * as Yup from 'yup';
import envelope from '../image/envelope.png';
import lock from '../image/lock.png';
import '../Css/signin.css';

function SigninUser() {
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
      password: Yup.string().required('This field can not be empty'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('This field can not be empty'),
    }),
    onSubmit: (values) => {
      alert('Correct Sign Up');
      formik.resetForm();
    },
  });

  return (
    <div className="container-sign">
      <div className="signin">
        <div className="header-title">
          <h3 className="title">Sign Up</h3>
        </div>

        <form onSubmit={formik.handleSubmit} className="content">
          <div className="signin-input">
            <div className="input-name-div">
              <label htmlFor="name">Name</label>
              <input
                className="input-name"
                type="text"
                placeholder="Name"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-email">
                  <p className="title-error">{formik.errors.name}</p>
                </div>
              ) : null}
            </div>

            <div className="input-email-div">
              <label htmlFor="email">
                Email<span>*</span>
              </label>
              <input
                className={`input-email ${
                  formik.touched.email && formik.errors.email ? 'error-empty-email' : ''
                }`}
                type="text"
                placeholder="Email"
                {...formik.getFieldProps('email')}
              />
              <img className="img-email-sign" src={envelope} alt="" />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-email">
                  <p className="title-error">{formik.errors.email}</p>
                </div>
              ) : null}
            </div>

            <div className="input-pass-div">
              <label htmlFor="password">
                Password<span>*</span>
              </label>
              <input
                className={`input-password ${
                  formik.touched.password && formik.errors.password ? 'error-empty-pass' : ''
                }`}
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              <img className="img-pass-sign" src={lock} alt="" />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-pass">
                  <p className="title-error">{formik.errors.password}</p>
                </div>
              ) : null}
            </div>

            <div className="input-pass-div">
              <label htmlFor="passwordConfirm">
                Password Confirmation<span>*</span>
              </label>
              <input
                className={`input-password ${
                  formik.touched.passwordConfirm && formik.errors.passwordConfirm
                    ? 'error-empty-pass'
                    : ''
                }`}
                id="passwordConfirm"
                type="password"
                placeholder="Password Confirmation"
                {...formik.getFieldProps('passwordConfirm')}
              />
              <img className="img-pass-sign" src={lock} alt="" />
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                <div className="error-pass">
                  <p className="title-error">{formik.errors.passwordConfirm}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="button">
            <div>
              <input type="submit" className="btn-signin" value="Sign Up" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninUser;
