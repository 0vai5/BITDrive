import axios from "axios";

export const loginAction = async (formData, config) => {
  try {
    const { data, error } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/signin`,
      formData,
      config
    );

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const signupAction = async (formData, config) => {
  try {
    const { data, error } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/signup`,
      formData,
      config
    );

    if (error) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};
