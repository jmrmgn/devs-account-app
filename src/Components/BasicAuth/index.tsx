import { useFormik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { AuthService } from '../../Services/Auth';
import { setUser } from '../../Reducers/Auth';
import { useDispatch } from 'react-redux';

const Schema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required'),
});

const BasicAuth = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: Schema,
    onSubmit: async (values, { setFieldError, setSubmitting, resetForm }) => {
      setSubmitting(true);
      await handleLogin(values);
      setSubmitting(false);
    },
  });

  const handleLogin = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    const payload: any = await AuthService.login(values.email, values.password);

    if (payload) {
      dispatch(setUser({ user: payload }));
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label className='label'>
          <span className='label-text'>Email</span>
        </label>
        <input
          disabled={formik.isSubmitting}
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          type='email'
          placeholder='Email'
          className={cx('input input-bordered w-full', {
            'border-red-400': formik.errors.email,
          })}
        />
        {formik.errors.email && (
          <div className='text-red-500'>{formik.errors.email}</div>
        )}
      </div>
      <div className='mt-5'>
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          disabled={formik.isSubmitting}
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          type='password'
          placeholder='Password'
          className={cx('input input-bordered w-full', {
            'border-red-400': formik.errors.password,
          })}
        />
        {formik.errors.password && (
          <div className='text-red-500'>{formik.errors.password}</div>
        )}
      </div>
      <div className='mt-5 flex justify-end'>
        <button
          className={cx('btn btn-primary', {
            loading: formik.isSubmitting,
          })}
          type='submit'
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default BasicAuth;
