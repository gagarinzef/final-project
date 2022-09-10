const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
let access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNzk0NDg5fQ.k_mdh2gX9DT8ycWPtIujHmNMjbi4ETwiS5aA_QY4O9c";

jest.setTimeout(1000);

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "costumer1",
          email: "apisislami@gmail.com",
          password: hashPassword("qwerty123"),
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwaXNpc2xhbWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMiLCJpYXQiOjE2NjI4MDA2NzUsImV4cCI6MTY2Mjg4NzA3NX0.miTloujDJmyxFw6tmPY7zrdeynjOobhVqksdjIv6dXs",
          status: "Inactive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
      await queryInterface.bulkInsert("Categories", categories, {}),
      await queryInterface.bulkInsert("News", news, {});
  } catch (error) {
    console.log(error);
  }
});
afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
});

// =================================================
// User Register
describe("POST /users", () => {
  describe("POST /users - Success", () => {
    it("Should return newly registered user's id and email", async () => {
      const registerData = {
        username: "new comer",
        email: "qwerty@gmail.com",
        password: "qwerty123",
      };
      const response = await request(app).post("/users").send(registerData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Verify email has been sent");
    });
  });
  describe("POST /users - Error", () => {
    it("Should return email already exist", async () => {
      const registerData = {
        username: "costumer1",
        email: "apisislami@gmail.com",
        password: "qwerty123",
      };
      const response = await request(app).post("/users").send(registerData);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("internal server error");
    });
    // it("Should return Please insert your email", async () => {
    //   const registerData = {
    //   username: "costumer1",
    //   email: "   ",
    //   password: "qwerty123",
    // };
    // const response = await request(app)
    //     .post("/users")
    //     .send(registerData);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe("Please insert your email");
    // });
    // it("Should return Please insert your email", async () => {
    // const registerData = {
    //   username: "costumer1",
    //   email: "",
    //   password: "qwerty123",
    // };
    // const response = await request(app)
    //     .post("/users")
    //     .send(registerData);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe("Please insert your email");
    // });
    // it("Should return Please enter an email e.g blabla@gmail.com", async () => {
    // const registerData = {
    //   username: "costumer1",
    //   email: "apisislami",
    //   password: "qwerty123",
    // };
    //   const response = await request(app)
    //     .post("/users")
    //     .send(registerData);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe(
    //     "Please enter an email e.g blabla@gmail.com"
    //   );
    // });
    // it("Should return Please insert your password", async () => {
    // const registerData = {
    //   username: "costumer1",
    //   email: "apisislami@gmail.com",
    //   password: "",
    // };
    //   const response = await request(app)
    //     .post("/users")
    //     .send(registerData);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe("Please insert your password");
    // });
    // it("Should return Please insert your password", async () => {
    // const registerData = {
    //   username: "costumer1",
    //   email: "apisislami@gmail.com",
    //   password: "   ",
    // };
    //   const response = await request(app)
    //     .post("/users")
    //     .send(registerData);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe("Please insert your password");
    // });
  });
});

// Get Users Data
describe("GET /users", () => {
  describe("GET /users - Success", () => {
    it("Should return all user's id, username, email, and status", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(typeof response.body[0].id).toBe("number");
      expect(typeof response.body[0].username).toBe("string");
      expect(typeof response.body[0].email).toBe("string");
      expect(typeof response.body[0].status).toBe("string");
    });
  });
});

// describe("GET /users/verify/:token", () => {
//   describe("GET /users/verify/:token - Success", () => {
//     it("Should return all user's id, username, email, and status", async () => {
//       const response = await request(app).get("/users/verify/:token");
//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty(expect.any(Object));
//       expect(typeof response.body[0].id).toBe('number');
//       expect(typeof response.body[0].username).toBe('string');
//       expect(typeof response.body[0].email).toBe('string');
//       expect(typeof response.body[0].status).toBe('string');
//     });
//   });
// });

// Get verify token
describe("GET /users/verify/:token", () => {
  describe("GET /users/verify/:token - Success", () => {
    it("Should return message Success Verify Email", async () => {
      const response = await request(app).get(
        "/users/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwaXNpc2xhbWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMiLCJpYXQiOjE2NjI4MDA2NzUsImV4cCI6MTY2Mjg4NzA3NX0.miTloujDJmyxFw6tmPY7zrdeynjOobhVqksdjIv6dXs"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Success Verify Email");
    });
  });

  describe("GET /users/verify/:token - Error", () => {
    it("Should return message User Not Found", async () => {
      const response = await request(app).get("/users/verify/sembarangtoken");
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("User Not Found");
    });
    it("Should return message User is already Active, please login!", async () => {
      const response = await request(app).get(
        "/users/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwaXNpc2xhbWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMiLCJpYXQiOjE2NjI4MDA2NzUsImV4cCI6MTY2Mjg4NzA3NX0.miTloujDJmyxFw6tmPY7zrdeynjOobhVqksdjIv6dXs"
      );
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        "User is already Active, please login!"
      );
    });
  });
});

// User Login
describe("POST /users/login", () => {
  describe("POST /users/login - Success", () => {
    it("Should return Logged In succesfully", async () => {
      const loginData = {
        email: "apisislami@gmail.com",
        password: "qwerty123",
      };
      const response = await request(app).post("/users/login").send(loginData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });
  describe("POST /users/login - Error", () => {
    it("Should return User Not Found", async () => {
      const loginData = {
        email: "",
        password: "",
      };
      const response = await request(app).post("/users/login").send(loginData);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User Not Found");
    });
    // it("Should return Email/password invalid", async () => {
    //   const payload = {
    //     email: "none@mail.com",
    //     password: "123456",
    //   };
    //   const response = await request(app).post("/users/login").send(payload);
    //   expect(response.status).toBe(401);
    //   expect(response.body.message).toBe("Email/password invalid");
    // });
    // it("Should return Email/password invalid", async () => {
    //   const payload = {
    //     email: "none@mail.com",
    //     password: "",
    //   };
    //   const response = await request(app).post("/users/login").send(payload);
    //   expect(response.status).toBe(401);
    //   expect(response.body.message).toBe("Email/password invalid");
    // });
  });
});

// Post Projects
describe("POST /projects", () => {
  describe("POST /projects - Success", () => {
    it("Should return message Project created", async () => {
      const createProject = { name: "Project title" };
      const response = await request(app)
        .post("/projects")
        .send(createProject)
        .set({ access_token });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Project created");
    });
  });

  describe("POST /projects - Error", () => {
    it("Should return message Please Login", async () => {
      const createProject = { name: "Project title" };
      const response = await request(app).post("/projects").send(createProject);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
  });
});

// Get Projects
describe("GET /projects", () => {
  describe("GET /projects - Success", () => {
    it("Should return List of Project", async () => {
      const response = await request(app)
        .get("/projects")
        .set({ access_token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body[0].id).toEqual(expect.any(Number));
      expect(response.body[0].UserId).toEqual(expect.any(Number));
      expect(response.body[0].ProjectId).toEqual(expect.any(Number));
      expect(response.body[0].role).toBe("leader");
      expect(response.body[0].Project).toEqual(expect.any(Object));
      expect(response.body[0].Project.id).toEqual(expect.any(Number));
      expect(response.body[0].Project.name).toEqual(expect.any(String));
    });
  });

  describe("GET /projects - Error", () => {
    it("Should return Please Login", async () => {
      const response = await request(app).get("/projects");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
  });
});

// Get Project by id
describe("GET /projects/:projectId", () => {
  describe("GET /projects/:projectId - Success", () => {
    it("Should return Project and Member List", async () => {
      const response = await request(app)
        .get("/projects/1")
        .set({ access_token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.project).toEqual(expect.any(Object));
      expect(response.body.project).toHaveProperty("name", expect.any(String));
      expect(response.body.project.Tasks).toEqual(expect.any(Array));
      expect(response.body.member).toEqual(expect.any(Array));
      expect(response.body.member[0]).toHaveProperty(
        "role",
        expect.any(String)
      );
      expect(response.body.member[0]).toHaveProperty(
        "User",
        expect.any(Object)
      );
      expect(response.body.member[0].User).toHaveProperty(
        "username",
        expect.any(String)
      );
    });
  });

  describe("GET /projects/:projectId - Error", () => {
    it("Should return Please Login", async () => {
      const response = await request(app).get("/projects/1");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
    it("Should return User not Authorized", async () => {
      const response = await request(app)
        .get("/projects/100")
        .set({ access_token });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("User not Authorized");
    });
  });
});

// describe("GET /users/fav", () => {
//   describe("GET /users/fav - Success", () => {
//     it("Should return Success add a news with id <NewsId> to favorite", async () => {
//       const response = await request(app).post("/users/fav/1").set({
//         access_token,
//       });
//       expect(response.status).toBe(201);
//     });
//     it("Should return Success read favorite news", async () => {
//       const response = await request(app).get("/users/fav/list").set({
//         access_token,
//       });
//       expect(response.status).toBe(200);
//       expect(response.body.favorite).toEqual(expect.any(Array));
//     });
//   });

//   describe("GET /users/fav - Error", () => {
//     it("Should return News not found", async () => {
//       const response = await request(app).post("/users/fav/100").set({
//         access_token,
//       });
//       expect(response.status).toBe(404);
//     });
//     it("Should return Only Customer user can access favorite page", async () => {
//       const response = await request(app).get("/users/fav/list").set({
//         access_token: tokenAdmin,
//       });
//       expect(response.status).toBe(403);
//       expect(response.body.message).toBe(
//         "Only Customer user can access favorite page"
//       );
//     });
//     it("Should return Please login first", async () => {
//       const response = await request(app).get("/users/fav");
//       expect(response.status).toBe(401);
//       expect(response.body.message).toBe("Please login first");
//     });
//   });
// });
