const { create } = require("json-server");
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
        {
          username: "costumer10",
          email: "hanuna@gmail.com",
          password: hashPassword("qwerty123"),
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwaXNpc2xhbWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMiLCJpYXQiOjE2NjI4MDA2NzUsImV4cCI6MTY2Mjg4NzA3NX0.miTloujDJmyxFw6tmPY7zrdeynjOobhVqksdjIv6dXs",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   username: "costumer100",
        //   email: "nina@gmail.com",
        //   password: hashPassword("qwerty123"),
        //   token:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwaXNpc2xhbWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMiLCJpYXQiOjE2NjI4MDA2NzUsImV4cCI6MTY2Mjg4NzA3NX0.miTloujDJmyxFw6tmPY7zrdeynjOobhVqksdjIv6dXs",
        //   status: "Inactive",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
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
        username: "costumer100",
        email: "nina@gmail.com",
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
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expect.any(String));
    });
    it("Should return You must input all form before submit", async () => {
      const registerData = {
        username: "",
        email: "",
        password: "",
      };
      const response = await request(app).post("/users").send(registerData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You must input all form before submit"
      );
    });
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
    it("Should return Email/Password Invalid", async () => {
      const loginData = {
        email: "apisislami@gmail.com",
        password: "qwerty",
      };
      const response = await request(app).post("/users/login").send(loginData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email/Password Invalid");
    });
    // it("Should return Please activate your account, by checking your email!", async () => {
    //   const login = { email: "nina@gmail.com", password: "qwerty123" };
    //   const response = await request(app).post("/users/login").send(login);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe(
    //     "Please activate your account, by checking your email!"
    //   );
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
    it("Should return Invalid Token", async () => {
      const createProject = { name: "Project title" };
      const response = await request(app)
        .post("/tasks")
        .send(createProject).set({ access_token: "bukantokenasli" });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
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
    it("Should return Invalid Token", async () => {
      const response = await request(app)
        .get("/projects")
        .set({ access_token: "bukantokenasli" });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
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
    it("Should return Invalid Token", async () => {
      const response = await request(app)
        .get("/projects/1")
        .set({ access_token: "bukantokenasli" });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
    });
  });
});

// Post Tasks
describe("POST /tasks", () => {
  describe("POST /tasks - Success", () => {
    it("Should return message and task's title", async () => {
      const taskData = {
        title: "Create server testing",
        date: new Date(),
        color: "red",
      };
      const response = await request(app)
        .post("/tasks")
        .send(taskData)
        .set({ access_token });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.message).toBe("Success Create Task");
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("title", expect.any(String));
    });
  });

  describe("POST /tasks - Error", () => {
    it("Should return Please Login", async () => {
      const response = await request(app).post("/tasks");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
    it("Should return Title name is required", async () => {
      const response = await request(app).post("/tasks").set({ access_token });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Title name is required");
    });
    it("Should return Date is required", async () => {
      const response = await request(app)
        .post("/tasks")
        .send({ title: "title" })
        .set({ access_token });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Date is required");
    });
    it("Should return Invalid Token", async () => {
      const taskData = {
        title: "Create server testing",
        date: new Date(),
        color: "red",
      };
      const response = await request(app)
        .post("/tasks")
        .send(taskData).set({ access_token: "bukantokenasli" });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
    });
  });
});

// Get Tasks
describe("GET /tasks", () => {
  describe("GET /tasks - Success", () => {
    it("Should return Task List", async () => {
      const response = await request(app).get("/tasks").set({ access_token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body[0]).toHaveProperty("ProjectId", expect.any(Number));
      expect(response.body[0]).toHaveProperty("status", expect.any(String));
      expect(response.body[0]).toHaveProperty("title", expect.any(String));
      expect(response.body[0]).toHaveProperty("date", expect.any(String));
      expect(response.body[0]).toHaveProperty("color", expect.any(String));
    });
  });

  describe("GET /tasks - Error", () => {
    it("Should return Please Login", async () => {
      const response = await request(app).get("/tasks");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
    it("Should return Data not Found", async () => {
      const response = await request(app).get("/tasks").set({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYyODM4Mjk0fQ.fiI3lUUblRZdUNLPZS9_GjvXxgaCnss9Jy0DljnIIgA",
      });
      expect(response.status).toBe(200);
      expect(response.body).toBe("Data not Found");
    });
    it("Should return Invalid Token", async () => {
      const response = await request(app).get("/tasks").set({
        access_token: "sembarangtoken",
      });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
    });
  });
});

// Post User Projects
describe("POST /userprojects", () => {
  describe("POST /userprojects - Success", () => {
    it("Should return message Invitation email has been sent", async () => {
      const inviteData = {
        email: "hanuna@gmail.com",
        ProjectId: 1,
      };
      const response = await request(app)
        .post("/userprojects")
        .send(inviteData)
        .set({ access_token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.message).toBe("Invitation email has been sent");
    });
  });

  describe("POST /userprojects - Error", () => {
    it("Should return Please Login", async () => {
      const response = await request(app).post("/userprojects");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
    it("Should return Data not Found", async () => {
      const response = await request(app)
        .post("/userprojects")
        .send({ email: "hanuna@gmail.com" })
        .set({ access_token });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Data not Found");
    });
    it("Should return Data not Found", async () => {
      const response = await request(app)
        .post("/userprojects")
        .send({ ProjectId: 1 })
        .set({ access_token });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Data not Found");
    });
    it("Should return User not registered", async () => {
      const response = await request(app)
        .post("/userprojects")
        .send({ email: "hanuin@gmail.com", ProjectId: 1 })
        .set({ access_token });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Data not Found");
    });
    it("Should return Invalid Token", async () => {
      const response = await request(app)
        .post("/userprojects")
        .set({ access_token: "bukantokenasli" });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
    });
  });
});

// Post User Projects Accept
describe("POST /userprojects/accept", () => {
  describe("POST /userprojects/accept - Success", () => {
    it("Should return message Invitation email has been sent", async () => {
      const inviteData = {
        email: "hanuna@gmail.com",
        ProjectId: 1,
      };
      const response = await request(app)
        .post("/userprojects/accept?UserId=2&ProjectId=1")
        .send(inviteData)
        .set({ access_token });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.message).toBe("Success join to project");
    });
  });

  describe("POST /userprojects/accept - Error", () => {
    it("Should return Please Login", async () => {
      const response = await request(app).post(
        "/userprojects/accept?UserId=2&ProjectId=1"
      );
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Please Login");
    });
    it("Should return User already enrolled in this project", async () => {
      const response = await request(app)
        .post("/userprojects/accept?UserId=2&ProjectId=1")
        .send({ email: "hanuna@gmail.com" })
        .set({ access_token });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "User already enrolled in this project"
      );
    });
    it("Should return Invalid Token", async () => {
      const response = await request(app)
        .post("/userprojects/accept?UserId=2&ProjectId=1")
        .set({ access_token: "bukantokenasli" });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Invalid Token");
    });
  });
});

// if (error.name === "notRegistered") {
//   res.status(404).json({ message: "User not registered" });
// } else {
//   console.log(error);
