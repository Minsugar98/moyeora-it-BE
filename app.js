import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import socket from "./config/socket.js";
import authRouter from "./router/authRouter.js";
import followRouter from "./router/followRouter.js";
import notificationRouter from "./router/notificationRouter.js";
import ratingRouter from "./router/ratingRouter.js";
import userRouter from "./router/userRouter.js";
import { swaggerSpec, swaggerUi } from "./swagger/swagger.js";

const app = express();
const server = http.createServer(app);

const allowedDomains = [
  "http://localhost:3000",
  "https://localhost:3000",
  "http://my.sjcpop.com",
  "http://www.my.sjcpop.com",
  "https://my.sjcpop.com",
  "https://www.my.sjcpop.com",
  "http://127.0.0.1:3000",
  "https://127.0.0.1:3000",
  "https://local.sjcpop.com:3000",
];

app.use(
  cors({
    origin: allowedDomains,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/rating", ratingRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notification", notificationRouter);
app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

const io = new Server(server, {
  cors: {
    origin: allowedDomains,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
  transports: ["websocket", "polling"],
  path: "/socket.io/",
  allowEIO4: true,
});

socket(io);
app.set("io", io);

server.listen(3001, () => {
  console.log(`🏇${app.get("port")}에서 서버가 실행중입니다!🚴🏻  `);
});
