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
      expect(response.body.error.message).toBe("Title name is required");
    });
    it("Should return Date is required", async () => {
      const response = await request(app)
        .post("/tasks")
        .send({ title: "title" })
        .set({ access_token });
      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("Date is required");
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
  });
});