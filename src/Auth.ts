const AUTH_TOKEN_KEY = "arithmetics@auth_token";

export const Auth = {
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  setToken: (token: string | null) => {
    if (!token) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } else {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  }
};
