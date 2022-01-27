import * as express from "express";
let router = express.Router();
import { compare } from "bcryptjs";

import User from "../models/User";
import { requestBuilder } from "../utils/utils";
import { generateToken } from "../utils/utils";
import { middleCheck } from "../middleware/index";

router
  .route("/")
  .get(middleCheck, async (req, res) => {
    try {
      console.log("check", req.body.userId);
      let users = await User.find(
        { active: true, _id: { $nin: [req.body.userId] } },
        { _id: 1, name: 1 }
      );
      if (!users) {
        res.status(401).send(requestBuilder([], "users not found", false));
      } else {
        res
          .status(200)
          .send(
            requestBuilder(users, "users list retrieved successfully", true)
          );
      }
    } catch (err) {
      res
        .status(401)
        .end(requestBuilder([], "Unexpedted error in user fetch!", false));
    }
  })
  .post(async (req, res) => {
    try {
      let userObject = req.body.userObj;

      let user = await new User(userObject).save();
      if (!user) {
        res.status(401).send(requestBuilder([], "user not created", false));
      } else {
        res.status(200).send(
          requestBuilder(
            {
              token: generateToken(user.id),
              user,
            },
            "user created succesfully!",
            true
          )
        );
      }
    } catch (err) {
      console.log("err", err);
      res
        .status(401)
        .send(requestBuilder([], "Unexpedted error in user creation!", false));
    }
  });

router
  .route("/:userId")
  .get(async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
      if (!user) {
        res.status(401).send(requestBuilder([], "user not found", false));
      } else {
        res
          .status(200)
          .send(requestBuilder(user, "user retrieved successfully", true));
      }
    } catch (err) {
      res
        .status(401)
        .send(
          requestBuilder([], "Unexpedted error in single user fetch!", false)
        );
    }
  })
  .post(async (req, res) => {
    try {
      // hard delete
      let user = await User.findByIdAndRemove(req.params.userId);

      if (!user) {
        res.status(401).send(requestBuilder([], "user not deleted", false));
      } else {
        res
          .status(200)
          .send(requestBuilder(user, "user deleted successfully", true));
      }
    } catch (err) {
      res
        .status(401)
        .send(requestBuilder([], "Unexpedted error in user delete!", false));
    }
  })
  .put(async (req, res) => {
    try {
      let userObject = req.body;

      let user = await User.findByIdAndUpdate(req.params.userId, userObject);

      if (!user) {
        res.status(401).send(requestBuilder([], "user not updated", false));
      } else {
        res
          .status(200)
          .send(requestBuilder(user, "users updated successfully", true));
      }
    } catch (err) {
      res
        .status(401)
        .send(requestBuilder([], "Unexpedted error in user update!", false));
    }
  });

router.route("/delete/:userId").put(async (req, res) => {
  try {
    console.log("delete", req.params.userId);
    // soft delete
    let user = await User.findByIdAndUpdate(req.params.userId, {
      active: false,
    });

    if (!user) {
      res.status(401).send(requestBuilder([], "no user to delete", false));
    } else {
      res
        .status(200)
        .send(requestBuilder(user, "users deleted successfully", true));
    }
  } catch (err) {
    res
      .status(401)
      .send(requestBuilder([], "Unexpedted error in user delete!", false));
  }
});

router.route("/api/login").post(async (req, res) => {
  try {
    let user: any = "";
    user = await User.findOne({ phone: req.body.phone });

    let valid = false;
    if (user) {
      valid = await compare(req.body.password, user.password);
    }

    if (!valid) {
      res.status(200).send(requestBuilder([], "Invalid login details!", false));
    } else {
      res.status(200).send(
        requestBuilder(
          {
            token: generateToken(user.id),
            user,
          },
          "users login successfully",
          true
        )
      );
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(401)
      .send(requestBuilder([], "Unexpedted error in user login!", false));
  }
});

export default router;
