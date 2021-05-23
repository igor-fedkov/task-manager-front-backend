const getIsAuthenticated  = state => state.auth.isAuthenticated;

const getUser = state => state.auth?.user;

const getUserId = state => state.auth?.user?.id;

const getUserEmail = state => state.auth?.user?.email;

const getToken = state => state.auth.token;

const authSelectors = {
  getIsAuthenticated,
  getUser,
  getToken,
  getUserId,
  getUserEmail,
}


export default authSelectors;