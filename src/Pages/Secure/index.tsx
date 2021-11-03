import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import Layout from '../../Components/Layout';
import { RootState } from '../../store';

const SecurePage = () => {
  const userState = useSelector((state: RootState) => state.auth?.user);

  if (!userState?.loggedIn) {
    return <Redirect to='/' />;
  }
  return (
    <Layout>
      <div>this is a secure page</div>
    </Layout>
  );
};

export default SecurePage;
