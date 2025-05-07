// models/userModel.js
import supabase from "../config/db.js";

// 登录用
export const findUserByUsernameAndPassword = async (username, password) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error) throw error;
  return data;
};

// 注册
export const createUser = async (username, password) => {
  const { data, error } = await supabase
    .from("user")
    .insert([{ username, password }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 找用户
export const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
};

// 重置密码
export const updatePasswordByUsername = async (username, newPassword) => {
  const { data, error } = await supabase
    .from("user")
    .update({ password: newPassword })
    .eq("username", username)
    .select()
    .single();

  if (error) throw error;
  return data;
};
