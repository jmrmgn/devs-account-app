import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import config from '../Config/App';
import { removeUser, updateUser } from '../Helpers/Services';

const cookies = new Cookies();

const data = cookies.get(`${config.app}-user`);
const user = typeof data !== 'undefined' ? data : null;

interface PROFILE {
  first_name: string | null;
  last_name: string | null;
  trackerOnline?: boolean;
  mobileOnline?: boolean;
  online?: boolean;
  hourly_rate?: number;
  timezone?: string;
  video?: string | null;
  img?: string | undefined;
}

export interface AuthUser {
  loggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  _id: string | null;
  roles: [string] | null;
  profile: PROFILE | undefined;
}

interface AUTH {
  user: AuthUser;
}

const emptyState: AuthUser = {
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  email: null,
  _id: null,
  roles: null,
  profile: undefined,
};

const initialState: AUTH = {
  user: user ? user : emptyState,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: AuthUser }>) => {
      const temp: AuthUser = { ...action.payload.user, loggedIn: true };
      state.user = temp;
      updateUser(temp);
    },
    updateProfile: (state, action: PayloadAction<{ profile: PROFILE }>) => {
      const temp: AuthUser = { ...state.user, profile: action.payload.profile };
      state.user = temp;
      updateUser(temp);
    },
    logout: state => {
      state.user = emptyState;
      removeUser();
    },
  },
});

export const { setUser, updateProfile, logout } = authSlice.actions;

export default authSlice.reducer;
