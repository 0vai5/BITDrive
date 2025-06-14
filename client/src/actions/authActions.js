import axios from "axios";

export const loginAction = async (formData, config) => {
  try {
    const { data, error } = await axios.post(
      "https://bitdrive-server.vercel.app/api/v1/user/signin",
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
      "https://bitdrive-server.vercel.app/api/v1/user/signup",
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
