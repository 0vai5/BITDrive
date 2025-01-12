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

describe("User", () => {
  let token;
  let id;
  let emailUser = "test-14083@test.com";
  let passwordUser = "test123";
  beforeAll(async () => {
    try {
      const response = await axios.post(`${url}/user/signin`, {
        email: emailUser,
        password: passwordUser,
      });

      if (response && response.data) {
        token = response.data.token;
      }
    } catch (error) {
    }
  });

  test("Should be able to get user profile", async () => {
    const response = await axios.get(`${url}/user/profile`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status).toBe(200);
  });

  test("Should not be able to get user profile without token", async () => {
    try {
      const response = await axios.get(`${url}/user/profile`);
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  test("Should be able to update their email", async () => {
    const response = await axios.patch(
      `${url}/user/update-profile`,
      {
        email: "testing@testing.com",
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    emailUser = response.data.email;

    expect(response.status).toBe(200);
  });

  test("Should be able to update their password", async () => {
    const response = await axios.patch(
      `${url}/user/update-profile`,
      {
        password: "testing123",
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    passwordUser = "testing123";

    expect(response.status).toBe(200);
  });

  test("Should be able to update their name", async () => {
    const response = await axios.patch(
      `${url}/user/update-profile`,
      {
        name: "new-name",
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  test("Should not be able to update their profile without token", async () => {
    try {
      const response = await axios.patch(`${url}/user/update-profile`, {
        name: "new-name",
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  })

  test("Can get current user", async () => {
    const response = await axios.get(`${url}/user/getCurrentUser`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status).toBe(200);
  });

  test("Can logout", async () => {
    const response = await axios.get(`${url}/user/logout`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status).toBe(200);
  });
});
