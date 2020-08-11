import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
  baseURL: "http://1a65b00018e2.ngrok.io"
});

instance.interceptors.request.use(
  //Called autometically before every request
  async config => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  //Called when error
  err => {
    return Promise.reject(err);
  }
);

export default instance;
