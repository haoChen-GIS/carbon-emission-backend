// routes/emissionRoutes.js
import express from "express";
import {
  getEmissions,
  getTopNEmissions,
  getEmissionsByCountryHandler,
} from "../controllers/carbonEmissionsController.js";

const router = express.Router();

// GET /api/emissions?year=2020&country=China
router.get("/", getEmissions);
router.get("/top/:n/:year", getTopNEmissions);
router.get("/:country", getEmissionsByCountryHandler);
export default router;
