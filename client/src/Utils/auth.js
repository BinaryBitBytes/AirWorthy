import * as DECODE from "jwt-decode";
const decode = () => {
  return DECODE;
};
class AuthService_ {
  getToken() {
    return localStorage.getItem("id_token");
  }
  getReader() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export const AuthService = new AuthService_();
console.log(AuthService);
// export default AuthService();
