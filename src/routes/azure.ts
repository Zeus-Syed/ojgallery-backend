import * as express from "express";
import { middleCheck } from "../middleware";
import Image from "../models/Image";
let router = express.Router();

import { requestBuilder } from "../utils/utils";

router.route("/image/upload").post(middleCheck, async (req, res) => {
  try {
    const imageObject = {
      getUrl: req.body.body.getUrl,
      friends: JSON.parse(req.body.body.friendsList),
      owner: req.body.userId,
    };
    let image = await new Image(imageObject).save();
    if (!image) {
      res.status(200).send(requestBuilder([], "Invalid login details!", false));
    } else {
      res
        .status(200)
        .send(requestBuilder("user", "user image uploaded successfully", true));
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(401)
      .send(requestBuilder([], "Unexpedted error in user login!", false));
  }
});

router.route("/images").get(middleCheck, async (req, res) => {
  try {
    let image = await Image.find(
      { owner: req.body.userId },
      { getUrl: 1, _id: 1 }
    );
    if (!image) {
      res.status(200).send(requestBuilder([], "Invalid login details!", false));
    } else {
      res
        .status(200)
        .send(requestBuilder(image, "User images fetched successfully", true));
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(401)
      .send(requestBuilder([], "Unexpedted error in user login!", false));
  }
});

router.route("/tagged/images").get(middleCheck, async (req, res) => {
  try {
    let image = await Image.find({ friends: req.body.userId }, { getUrl: 1 });
    if (!image) {
      res.status(200).send(requestBuilder([], "Invalid login details!", false));
    } else {
      res
        .status(200)
        .send(
          requestBuilder(image, "Tagged images fetched successfully", true)
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
