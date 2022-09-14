const io = require("socket.io-client");
const { io: server } = require("../index");

describe("WOK-IT-OUT TESTING - SOCKET", function () {
  //ngejalain servernya
  server.attach(3010);
  // let sender;
  // let receiver;
  let socket;

  beforeAll(function (done) {
    // Setup
    socket = io.connect("http://localhost:3010", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
    });

    socket.on("connect", function () {
      console.log("worked...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
  });

  afterAll(function (done) {
    // Cleanup
    socket.close();
    done();
  });

  describe("Chat tests", function () {
    // test("Join project chat room", (done) => {
    //   const data = {
    //     roomName: "Teknologi Informasi",
    //     sender: "Budi",
    //     message: "test message",
    //     name: "Irham",
    //   };

    //   socket.emit("send-message", data);

    //   socket.on("room-detail", (dataRes) => {
    //     expect(dataRes).toBeInstanceOf(Object);
    //     expect(dataRes).toHaveProperty("name");
    //     done();
    //   });
    // });

    test("Sending message to the chat", (done) => {
      const data = {
        data: {
          user_id: 1,
          project_id: 1,
          username: "Aldo",
          chat: "This is chat sample",
          createdAt: new Date(),
        },
      };
      socket.emit("leave_project_chat", 1);
      socket.emit("join_project_chat", 1);
      // socket.off("receive_message");
      socket.emit("send_message", data);

      socket.on("receive_message", (dataRes) => {
        console.log(dataRes.data, "<<<<<<<<<");
        expect(dataRes).toEqual(expect.any(Object));
        expect(dataRes.data).toHaveProperty("user_id", expect.any(Number));
        expect(dataRes.data).toHaveProperty("project_id", expect.any(Number));
        expect(dataRes.data).toHaveProperty("chat", expect.any(String));
        expect(dataRes.data).toHaveProperty("username", expect.any(String));
        expect(dataRes.data).toHaveProperty("chat", expect.any(String));
        // expect(dataRes.data).toEqual(expect.any(Object));
        // expect(dataRes.data).toEqual(expect.any(Object));
        // expect(dataRes.data).toEqual(expect.any(Object));

        // expect(dataRes).toHaveProperty("username");
        done();
      });
    });

    // test("Show typing message", (done) => {
    //   let payload = {
    //     room: "Teknologi Informasi",
    //     name: "Budi",
    //   };
    //   socket.emit("typing-start", payload);

    //   socket.on("typing-start", (data) => {
    //     expect(data.name).toBe(payload.name);
    //     done();
    //   });
    // });
  });
});
