import axios from "axios";

const API_URL = `http://localhost:8080/api/auth/`;

class AuthService {
  login(email, password) {
    console.log(process.env.PORT)
    console.log(email,password)
    return axios
      .post(`${API_URL}login`, { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return axios.post(`${API_URL}signup`, {
      email,
      password,
    });
  }
}

export default new AuthService();