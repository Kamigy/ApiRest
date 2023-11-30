import AxiosInstance from "./AxiosInstance";

class ApiService {
  async getLoggedUser() {
    const { data } = await AxiosInstance.get(`/users/@me`);
    return data;
  }

  async getRestaurantAccounts() {
    const { data } = await AxiosInstance.get(`/users`);
    return data;
  }

  async createRestaurantUser(restaurantUser) {
    const { data } = await AxiosInstance.post(`/user`, {
      restaurantUser
    });
    return data;
  }

  async deleteRestaurant(userId) {
    const { data } = await AxiosInstance.delete(`/user/${userId}`, {
      
    });
    return data;
  }

  async updateRestaurantUser(restaurantUser) {
    const { data } = await AxiosInstance.patch(`/user/${restaurantUser._id}`, {
      restaurantUser
    });
    return data;
  }

  async getPlate(plateId) {
    const user = await this.getLoggedUser();
    const { data } = await AxiosInstance.get(`/user/${user._id}/plate/${plateId}`);
    return data;
  }

  async updatePlate(plateId, newPlate) {
    const user = await this.getLoggedUser();
    const { data } = await AxiosInstance.patch(`/user/${user._id}/plate/${plateId}`, {
      newPlate
    });
    return data;
  }

  async createPlate(newPlate) {
    const user = await this.getLoggedUser();
    const { data } = await AxiosInstance.post(`/user/${user._id}/plate`, {
      newPlate    
    });
    return data;
  }

  async getRestaurantPlates() {
    const user = await this.getLoggedUser();
    const { data } = await AxiosInstance.get(`/user/${user._id}/plates`);
    return data;
  }

  async cancelOrder(orderId) {
    const user = await this.getLoggedUser();
    const { data } = await AxiosInstance.patch(`/user/${user._id}/order/${orderId}`, {
      
    });
    return data;
  }

  async getRestaurantOrders() {
    const user = await this.getLoggedUser();
    const { data } = await AxiosInstance.get(`/user/${user._id}/orders`);
    return data;
  }
}

export default new ApiService();
