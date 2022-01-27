import User from "../models/User";
import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const middleCheck = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
      const decoded = <any>verify(token, JWT_SECRET);
      if (decoded.userId) {
        // considering req.body as session. only if there a session data, the route will be executed
        req.body.userId = decoded.userId;
        next();
      }
    } catch (err) {
      res.send("JWT Token Issue!");
    }
  } else {
    res.send("Not Authorized to access this route!!");
  }
};
