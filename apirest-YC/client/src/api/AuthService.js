import { useUserStore } from "../store/user";
import AxiosInstance from "./AxiosInstance";

class AuthService {
  async login(email, password) {
    const { data } = await AxiosInstance.post(`/login`, {
      email,
      password,
    });

    return data.accessToken;
  }
  async register(email, name, password) {
    const { data } = await AxiosInstance.post(`/register`, {
      name,
      email,
      password,
    });
    return data.accessToken;
  }
  
  logout() {
    const userStore = useUserStore();
    userStore.logout();
  }
}

export default new AuthService();
