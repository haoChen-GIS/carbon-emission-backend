// dual-db-api/index.js
import express from "express";
import cors from "cors";
import pg from "pg";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ 加载 .env 文件

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// PostgreSQL 连接
const pgPool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

pgPool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ PostgreSQL error:", err));

// MongoDB 连接
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// Mongo 模型定义
const CountryEmission = mongoose.model(
  "CountryEmission",
  new mongoose.Schema(
    {
      year: Number,
      country: String,
      carbon_emission: Number,
      latitude: Number,
      longitude: Number,
    },
    {
      collection: "country_emission", // ✅ 显式绑定集合名
    }
  )
);

// PostgreSQL 查询接口
app.get("/api/emissions", async (req, res) => {
  const { year, country } = req.query;
  try {
    const result = await pgPool.query(
      "SELECT * FROM country_emission WHERE year = $1 AND country = $2",
      [year, country]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ PostgreSQL query error:", err);
    res.status(500).send("PostgreSQL error");
  }
});

// MongoDB 查询接口
app.get("/api/mongo-emissions", async (req, res) => {
  const { year, country } = req.query;
  try {
    const query = {};
    if (year) query.year = Number(year);
    if (country) query.country = country;
    const result = await CountryEmission.find(query);
    res.json(result);
  } catch (err) {
    console.error("❌ MongoDB query error:", err);
    res.status(500).send("MongoDB error");
  }
});

// 测试接口
app.get("/", (req, res) => {
  res.send("🚀 Dual DB API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://:${PORT}`);
});
