import axios from "axios";

export const loginAction = async (formData) => {
  try {
    const { data, error } = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      formData
    );
    console.log("Login Action", data);
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};
export const signupAction = async (formData) => {
  try {
    const { data, error } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      formData
    );
    console.log("Login Action", data);
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};
