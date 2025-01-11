const axios = require("axios");

const url = "http://localhost:3000/api/v1";
const email = `test-${Math.ceil(Math.random() * 100000)}@test.com`;
const password = "test123";
const name = `test-${Date.now()}`;

describe("Authentication", () => {
  test("Should signUp a new User", async () => {
    const response = await axios.post(`${url}/user/signup`, {
      email,
      password,
      name,
    });

    expect(response.status).toBe(201);
  });

  test("Should not signUp a new User with the same email", async () => {
    try {
      await axios.post(`${url}/user/signup`, {
        email,
        password,
        name,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Should be able to signin", async () => {
    const response = await axios.post(`${url}/user/signin`, {
      email,
      password,
    });

    expect(response.status).toBe(200);
  });

  test("Should not be able to signin with the wrong password", async () => {
    try {
        const response = await axios.post(`${url}/user/signin`, {
          email,
          password: "wrong-password",
        });

    } catch (error) {
        expect(error.response.status).toBe(401);
    }
  });

  test("Should not be able to signin with the wrong email", async () => {
    try {
        const response = await axios.post(`${url}/user/signin`, {
          email: "wrong-email@email.com",
          password,
        });

    } catch (error) {
        expect(error.response.status).toBe(401);
    }
  });

  test("Should not be able to signin with the wrong email format", async () => {
    try {
        const response = await axios.post(`${url}/user/signin`, {
          email: "wrong-email",
          password,
        });

    } catch (error) {
        expect(error.response.status).toBe(401);
    }
  });
});


