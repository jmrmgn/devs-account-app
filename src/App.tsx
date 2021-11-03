import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageLoader from './Components/PageLoader';

const HomePage = lazy(() => import('./Pages/Home'));
const SecurePage = lazy(() => import('./Pages/Secure'));

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/secure' component={SecurePage} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
