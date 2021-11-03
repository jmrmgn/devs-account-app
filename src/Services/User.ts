import { RequestService } from './Request';

const updateProfile = (firstname: string, lastname: string) => {
  return RequestService.put('/user/update', {
    firstname,
    lastname,
  });
};

export const AuthService = {
  updateProfile,
};
