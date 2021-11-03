import { RequestService } from './Request';

const google = (accessToken: string, timezone: string) => {
  return RequestService.post(`/auth/google`, {
    access_token: accessToken,
    timezone: timezone,
  });
};

const login = (email: string, password: string) => {
  return RequestService.post(`/auth/login`, {
    email: email,
    password: password,
  });
};

const logout = () => {
  return RequestService.get(`/auth/logout`, '');
};

export const AuthService = {
  google,
  login,
  logout,
};
