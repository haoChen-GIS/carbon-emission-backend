import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

import usersRoutes from "./routes/usersRoutes.js";
import carbonEmissionsRoutes from "./routes/carbonEmissionsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 PostgreSQL API is running");
});

// 用户相关接口
app.use("/api/users", usersRoutes);

// 碳排放查询接口
app.use("/api/emissions", carbonEmissionsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
