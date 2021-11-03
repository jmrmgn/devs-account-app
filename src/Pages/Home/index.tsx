import { useFormik } from 'formik';
import { lazy } from 'react';
import * as Yup from 'yup';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../Components/Layout';
import { AuthService } from '../../Services/User';
import { updateProfile } from '../../Reducers/Auth';
import { RootState } from '../../store';

const Auth = lazy(() => import('../../Modules/Auth'));

const Schema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
});

const HomePage = () => {
  const userState = useSelector((state: RootState) => state.auth?.user);
  const dispatch = useDispatch();
  const { loggedIn, profile } = userState;
  const userProfile = profile;

  const formik = useFormik({
    initialValues: {
      firstname: userProfile?.first_name ?? '',
      lastname: userProfile?.last_name ?? '',
    },
    validateOnChange: false,
    validationSchema: Schema,
    onSubmit: async (values, { setFieldError, setSubmitting, resetForm }) => {
      setSubmitting(true);
      await handleUpdate(values);
      setSubmitting(false);
    },
  });

  const handleUpdate = async (values: {
    firstname: string;
    lastname: string;
  }): Promise<void> => {
    const payload: any = await AuthService.updateProfile(
      values.firstname,
      values.lastname
    );

    if (payload) {
      dispatch(updateProfile({ profile: payload?.profile }));
    }
  };

  return (
    <Layout>
      {loggedIn ? (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className='label'>
              <span className='label-text'>Firstname</span>
            </label>
            <input
              disabled={formik.isSubmitting}
              value={formik.values.firstname}
              onChange={formik.handleChange('firstname')}
              type='text'
              placeholder='Firstname'
              className={cx('input input-bordered w-full', {
                'border-red-400': formik.errors.firstname,
              })}
            />
            {formik.errors.firstname && (
              <div className='text-red-500'>{formik.errors.firstname}</div>
            )}
          </div>
          <div className='mt-5'>
            <label className='label'>
              <span className='label-text'>Lastname</span>
            </label>
            <input
              disabled={formik.isSubmitting}
              value={formik.values.lastname}
              onChange={formik.handleChange('lastname')}
              type='text'
              placeholder='Lastname'
              className={cx('input input-bordered w-full', {
                'border-red-400': formik.errors.lastname,
              })}
            />
            {formik.errors.lastname && (
              <div className='text-red-500'>{formik.errors.lastname}</div>
            )}
          </div>
          <div className='mt-5 flex justify-end'>
            <button
              className={cx('btn btn-primary', {
                loading: formik.isSubmitting,
              })}
              type='submit'
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <Auth />
      )}
    </Layout>
  );
};

export default HomePage;
