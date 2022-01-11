import "reflect-metadata";
import express from "express";
import "../infra/database";

const app = express();

app.use(express.json());

export { app };