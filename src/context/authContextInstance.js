import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  session: null,
  loading: false,
  isConfigured: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export default AuthContext;

