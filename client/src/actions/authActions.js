export const loginAction = async (data) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log("Login Action", data);
    return data;
};
export const signupAction = async (data) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log("Signup Action", data);
    return data
};