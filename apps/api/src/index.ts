import express from "express";
import { API_HEALTH_PATH, APP_NAME } from "@kisaansahyog/shared";

const app = express();
const startedAt = Date.now();
const configuredPort = Number(process.env.PORT ?? 3001);
const port =
  Number.isInteger(configuredPort) && configuredPort > 0 ? configuredPort : 3001;

app.disable("x-powered-by");
app.use(express.json({ limit: "64kb" }));

app.get(API_HEALTH_PATH, (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "@kisaansahyog/api",
    app: APP_NAME,
    version: "0.1.0",
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (_request, response) => {
  response.status(200).json({
    name: `${APP_NAME} API`,
    version: "0.1.0",
    health: API_HEALTH_PATH,
    docs: "/api/v1",
  });
});

app.use((request, response) => {
  response.status(404).json({
    error: "not_found",
    message: `No route matches ${request.method} ${request.path}.`,
  });
});

app.listen(port, () => {
  console.log(`KisaanSahyog API listening on http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}${API_HEALTH_PATH}`);
});
