import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';

import { authOperations, authSelectors } from '../../redux';

import s from './AppBar.module.scss';

function AppBar() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { email } = useSelector(authSelectors.getUser);

  let btnCaption = '';
  if (email) {
    btnCaption = email[0].toUpperCase();
  }

  const onLogout = useCallback(() => {
    dispatch(authOperations.logout());
  }, [dispatch]);

  return (
    <>
      <Navbar className={s.appBar} bg="primary" expand="lg">
        <Container className={s.appBarContainer}>
          <Button
            onClick={() => history.push(routes.main)}
            className={s.btnGoToMainPage}
          >
            <span className="material-icons-outlined">space_dashboard</span>
            <span className={s.btnGoToMainPageCaption}>Boards</span>
          </Button>

          {email &&
            <div className={s.dropdownMenuContainer}>
              <Button
                // onClick={onLogoClick}
                className={s.btnDropdownMenu}
                variant="secondary">
                {btnCaption}
              </Button>
            
              <div className={s.dropdownMenu}>
                <Button onClick={onLogout} className={s.btnLogout} variant="secondary">
                  <span className={`material-icons-outlined ${s.iconInside}`}>logout</span>
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          }
        </Container>
      </Navbar>
    </>
      
  )
}

export default AppBar;