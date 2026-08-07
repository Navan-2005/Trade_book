import express from "express";
import jwt from "jsonwebtoken";
import { signup , login } from "../controller/credentials.js";

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

export default router;