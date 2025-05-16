// routes/emissionRoutes.js
import express from "express";
import {
  getEmissions,
  getTopNEmissions,
  getEmissionsByEntityHandler,
} from "../controllers/carbonEmissionsController.js";

const router = express.Router();

// GET /api/emissions?year=2020&entity=China
router.get("/", getEmissions);
router.get("/top/:n/:year", getTopNEmissions);
router.get("/:entity", getEmissionsByEntityHandler);
export default router;
