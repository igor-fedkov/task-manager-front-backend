import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import { authOperations, authSelectors, globalSelectors} from './redux';

import routes from './routes';
import { PrivatRoute, PublicRoute } from './components/Routes';

import { AppBar, Notification, LoaderSpinner } from './components';

import './App.scss';
import scaleTransitions from './scss/transitions/scale.module.scss';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const BoardPage = lazy(() => import('./pages/BoardPage'));


function App() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  const notification = useSelector(globalSelectors.getNotificationText);
  const token = useSelector(authSelectors.getToken);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      
      <CSSTransition
        in={!!notification}
        appear={true}
        classNames={scaleTransitions}
        timeout={200}
        unmountOnExit
      >					
        <Notification />
      </CSSTransition>

      <Suspense fallback={<LoaderSpinner/>}>
        <Switch>
          <PublicRoute
            path={routes.login} 
            isAuthenticated={isAuthenticated}
            redirectTo={routes.main}
          >
            <LoginPage />
          </PublicRoute>

          <PrivatRoute
            path={routes.main} exact
            isAuthenticated={token}
            redirectTo={routes.login}
          >
            <MainPage />
          </PrivatRoute>

          <PrivatRoute
            path={routes.cardsList}
            isAuthenticated={token}
            redirectTo={routes.login}
          >
            <BoardPage />
          </PrivatRoute>

          <Redirect to={routes.main} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
