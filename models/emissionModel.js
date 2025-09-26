// models/emissionModel.js
import supabase from "../config/db.js";

// 查询碳排放数据 by 年份和国家
export const getEmissionByYearAndEntity = async (year, entity) => {
  console.log("查询参数:", { year, entity });
  const { data, error } = await supabase
    .from("carbon_emissions_entity")
    .select("*")
    .eq("year", year) //  强制转换为数字
    .eq("entity", entity); //  去除可能的空格

  if (error) {
    console.error("Supabase query error:", error.message);
    throw error;
  }

  console.log("query results:", data); // 打印调试
  return data;
};

// 通过国家名称查询碳排放
export const getEmissionsByEntity = async (entity) => {
  const { data, error } = await supabase
    .from("carbon_emissions_entity")
    .select("*")
    .eq("entity", entity)
    .order("year", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

// 查询某年 Top N 排放国家
export const getTopNEmissionsByYear = async (year, n) => {
  const { data, error } = await supabase
    .from("carbon_emissions_coordinates")
    .select("*")
    .eq("year", year)
    .not("carbon_emission", "is", null) //  过滤掉空值
    .order("carbon_emission", { ascending: false })
    .limit(n);

  if (error) throw error;
  return data;
};
