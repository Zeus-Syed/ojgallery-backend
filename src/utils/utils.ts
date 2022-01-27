require("dotenv/config");
import {sign} from "jsonwebtoken";
import {JWT_SECRET} from "../config";

export function env(key: string, default_value: any) {
  const value = process.env[key];
  return value === undefined ? default_value : value;
}

export function requestBuilder(data: any, message: string, success: boolean) {
  return {
    data: data,
    message: message,
    success: success,
  };
}

export function generateToken(userId) {
  return sign({userId}, JWT_SECRET, {expiresIn: '365d'})
}