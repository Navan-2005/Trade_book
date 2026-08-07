import express from "express";
import cors from "cors";
import credentialsRouter from "./routes/credentials.js";
import { prisma } from "db";

if(prisma.$connect()){
    console.log("Database connected successfully");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/credentials", credentialsRouter);

app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});