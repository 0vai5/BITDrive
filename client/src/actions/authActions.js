import axios from "axios";

export const loginAction = async (formData, config) => {
  try {
    const { data, error } = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      formData,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};
export const signupAction = async (formData, config) => {
  try {
    const { data, error } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error, "error");
    throw new Error(error.message || "Signup failed");
  }
};
