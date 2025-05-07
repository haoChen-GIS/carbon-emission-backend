// models/emissionModel.js
import supabase from "../config/db.js";

// 查询碳排放数据 by 年份和国家
export const getEmissionByYearAndCountry = async (year, country) => {
  const { data, error } = await supabase
    .from("country_emission")
    .select("*")
    .eq("year", year)
    .eq("country", country);

  if (error) throw error;
  return data;
};

// 通过国家名称查询碳排放
export const getEmissionsByCountry = async (country) => {
  const { data, error } = await supabase
    .from("country_emission")
    .select("*")
    .eq("country", country)
    .order("year", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

// 查询某年 Top N 排放国家
export const getTopNEmissionsByYear = async (year, n) => {
  const { data, error } = await supabase
    .from("country_emission")
    .select("*")
    .eq("year", year)
    .not("carbon_emission", "is", null) // ✅ 过滤掉空值
    .order("carbon_emission", { ascending: false })
    .limit(n);

  if (error) throw error;
  return data;
};
