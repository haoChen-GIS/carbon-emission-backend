import {
  getEmissionByYearAndEntity,
  getEmissionsByEntity,
  getTopNEmissionsByYear,
} from "../models/emissionModel.js";

// 查询碳排放
// /api/emissions?year=2022&entity=China
export const getEmissions = async (req, res) => {
  const { year, entity } = req.query;
  console.log("query params2:", { year, entity });
  if (!year || !entity)
    return res.status(400).json({ message: "Year and entity are required" });

  try {
    const emissions = await getEmissionByYearAndEntity(year, entity);
    res.json(emissions);
  } catch (err) {
    console.error("❌ Emission query error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

//通过实体名称查询碳排放
// /api/emissions/:entity
export const getEmissionsByEntityHandler = async (req, res) => {
  const { entity } = req.params;

  try {
    const emissions = await getEmissionsByEntity(entity);

    if (!emissions || emissions.length === 0) {
      return res
        .status(404)
        .json({ message: "No emissions found for this country or area" });
    }

    res.json({ emissions });
  } catch (err) {
    console.error("❌ Country query error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 查询某年 Top N 排放国家
// /api/emissions/top/10/2022
export const getTopNEmissions = async (req, res) => {
  const { n, year } = req.params;

  if (!n || !year) {
    return res
      .status(400)
      .json({ message: "Both year and N must be provided." });
  }

  try {
    const topEmissions = await getTopNEmissionsByYear(year, n);
    res.json({ emissions: topEmissions });
  } catch (err) {
    console.error("❌ Top N query error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
